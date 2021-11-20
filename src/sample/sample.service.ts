import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { Sample } from './entity/sample.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleDto } from './dto/sample.dto';
import { unlink } from 'fs/promises';
import { Stock } from '../stock/stock.entity';
import { SampleInfo } from './entity/sampleInfo.entity';
import { SampleStock } from './entity/sampleStock.entity';
import { SampleTarget } from './entity/sampleTarget.entity';
import { SampleTargetDto } from './dto/sampleTarget.dto';
import { SampleTargetTime } from './entity/sampleTargetTime.entity';
import { SampleTargetTimeDto } from './dto/sampleTargetTime.dto';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(SampleInfo)
    private readonly sampleInfoRepository: Repository<SampleInfo>,
    @InjectRepository(SampleStock)
    private readonly sampleStockRepository: Repository<SampleStock>,
    @InjectRepository(SampleTarget)
    private readonly sampleTargetRepository: Repository<SampleTarget>,
    @InjectRepository(SampleTargetTime)
    private readonly sampleTargetTimeRepository: Repository<SampleTargetTime>,
  ) {}

  async updateSample(sampleId: number, sampleDto: SampleDto) {
    await getManager().transaction(async (transactionEntityManager) => {
      if (sampleDto.sampleInfo) {
        await transactionEntityManager.update(
          SampleInfo,
          { sampleId },
          sampleDto.sampleInfo,
        );

        delete sampleDto.sampleInfo;
      }

      if (sampleDto.sampleStock) {
        await transactionEntityManager.update(
          SampleStock,
          { sampleId },
          sampleDto.sampleStock,
        );

        delete sampleDto.sampleStock;
      }

      // if (sampleDto.sampleTargets) {
      //   await transactionEntityManager.update(
      //     SampleTarget,
      //     { sampleId },
      //     sampleDto.sampleTarget,
      //   );
      //
      //   delete sampleDto.sampleTargets;
      // }

      const result = await transactionEntityManager.update(
        Sample,
        { id: sampleId },
        sampleDto,
      );

      if (!result) throw new NotFoundException();

      return result;
    });
  }

  async findSample(sampleId: number) {
    const result = await this.sampleRepository.findOne({
      where: {
        id: sampleId,
        isDeleted: false,
      },
      relations: ['sampleInfo', 'sampleStock', 'sampleTargets'],
    });

    if (!result) throw new NotFoundException();
    return result;
  }

  async createSample(sampleDto: SampleDto) {
    await getManager().transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(SampleInfo, sampleDto.sampleInfo);
      await transactionEntityManager.save(SampleStock, sampleDto.sampleStock);
      await transactionEntityManager.save(Sample, sampleDto);
    });

    return sampleDto;
  }

  async createSampleTarget(sampleTargetDto: SampleTargetDto) {
    const target = await this.sampleTargetRepository.findOne(sampleTargetDto);

    if (!target) {
      return await this.sampleTargetRepository.save(sampleTargetDto);
    }

    return target;
  }

  async deleteSampleTarget(sampleTargetDto: SampleTargetDto) {
    return this.sampleTargetRepository.delete(sampleTargetDto);
  }

  async getSampleAll(query: Record<string, unknown>) {
    let isDeleted = query.isDeleted;
    if (!isDeleted) isDeleted = false;
    return this.sampleRepository.find({
      where: {
        isDeleted,
      },
      relations: ['sampleInfo', 'sampleStock', 'sampleTargets'],
      order: query,
    });
  }

  async getSampleImage(sampleId: number) {
    const result: any = await this.sampleRepository.findOne({
      id: sampleId,
      isDeleted: false,
    });

    if (!result) throw new NotFoundException();
    return result;
  }

  async createSampleImage(sampleId: number, file) {
    console.log(file);

    const result: any = await this.sampleRepository.update(
      {
        id: sampleId,
        isDeleted: false,
      },
      {
        image: file.location,
      },
    );

    if (!result) throw new NotFoundException();
    if (result.image !== undefined)
      await unlink(
        'https://dotori-resource.s3.ap-northeast-2.amazonaws.com/images/' +
          result.image,
      );
    return result;
  }

  async recoverSample(sampleId: number) {
    const result = await this.sampleRepository.update(
      {
        id: sampleId,
        isDeleted: true,
      },
      {
        isDeleted: false,
      },
    );

    if (!result) throw new NotFoundException();
    return result;
  }

  async deleteSample(sampleId: number, permanent: boolean) {
    const isExist: any = await this.sampleRepository.findOne({
      id: sampleId,
    });

    if (!isExist) throw new NotFoundException();
    if (permanent) {
      if (isExist.isDeleted === false) throw new ConflictException();
      await unlink('./uploads/' + isExist.image);
      await this.sampleRepository.delete({
        id: sampleId,
      });
    } else {
      if (isExist.isDeleted === true) throw new NotFoundException();
      await this.sampleRepository.update(
        {
          id: sampleId,
        },
        {
          isDeleted: true,
        },
      );
      await this.stockRepository.update(
        {
          sampleId,
        },
        {
          isDeleted: true,
        },
      );
    }
  }

  async createSampleTargetTime(sampleTargetTime: SampleTargetTimeDto) {
    const duplicate = await this.sampleTargetTimeRepository.findOne({
      startAt: sampleTargetTime.startAt,
      endAt: sampleTargetTime.endAt,
      isDeleted: false,
    });

    if (duplicate) throw Error('Duplicated Time');

    return this.sampleTargetTimeRepository.save(sampleTargetTime);
  }

  async recommendSample(taxiId: number, sampleTargetDto: SampleTargetDto) {
    const { isMale, age } = sampleTargetDto;

    return this.stockRepository
      .createQueryBuilder('stock')
      .where(`taxiId=${taxiId}`)
      .innerJoinAndSelect('stock.sample', 'sample')
      .innerJoinAndSelect('sample.sampleInfo', 'sample_info')
      .innerJoinAndSelect('sample.sampleStock', 'sample_stock')
      .innerJoinAndSelect('sample.sampleTargets', 'sample_target')
      .innerJoinAndSelect(
        'sample_target.sampleTargetTime',
        'sample_target_time',
      )
      .orderBy(
        `
              CASE
                WHEN (sample_target.age=${age} AND sample_target.isMale=${isMale}) THEN 1
                WHEN (sample_target.age=${age} AND sample_target.isMale IS NULL) THEN 2  
                WHEN (sample_target.age IS NULL AND sample_target.isMale=${isMale}) THEN 3
                WHEN (sample_target.age IS NULL AND sample_target.isMale IS NULL) THEN 4
                WHEN (sample_target.age=${age} AND sample_target.isMale!=${isMale}) THEN 5        
                WHEN (sample_target.age!=${age} AND sample_target.isMale=${isMale}) THEN 6 
                ELSE 7
              END  
        `,
        'ASC',
      )
      .getMany();
  }

  async getAllSampleTime() {
    return this.sampleTargetTimeRepository.find({ isDeleted: true });
  }

  async updateSampleTime(
    sampleTargetTimeId: number,
    sampleTargetTime: SampleTargetTimeDto,
  ) {
    return this.sampleTargetTimeRepository.update(
      { id: sampleTargetTimeId },
      sampleTargetTime,
    );
  }

  async deleteSampleTime(sampleTargetTimeId: number) {
    const duplicate = await this.sampleTargetTimeRepository.findOne({
      id: sampleTargetTimeId,
      isDeleted: false,
    });
    if (duplicate) throw new Error('Duplicated Time');

    return this.sampleTargetTimeRepository.delete({ id: sampleTargetTimeId });
  }
}
