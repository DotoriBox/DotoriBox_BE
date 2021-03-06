import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { Sample } from './sample.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleDto } from './sample.dto';
import { unlink } from 'fs/promises';
import { Stock } from '../stock/stock.entity';
import { SampleInfo } from './info/info.entity';
import { SampleStock } from './stock/stock.entity';
import { SampleTarget } from './target/target.entity';
import { SampleTargetDto } from './target/target.dto';
import { SampleTargetTime } from './target/time/time.entity';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
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
        'https://dotori-resource.s3.ap-northeast-2.amazonaws.com/images/sample/' +
          result.image,
      );
    return result;
  }

  async createSampleCardImage(sampleId: number, file) {
    const result: any = await this.sampleRepository.update(
      {
        id: sampleId,
        isDeleted: false,
      },
      {
        cardImage: file.location,
      },
    );

    if (!result) throw new NotFoundException();
    if (result.cardImage !== undefined)
      await unlink(
        'https://dotori-resource.s3.ap-northeast-2.amazonaws.com/images/card_sample/' +
          result.cardImage,
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
      await unlink('./uploads/card/' + isExist.image);
      await unlink('./uploads/miniCard/' + isExist.image);
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

  async recommendSample(taxiId: number, sampleTargetDto: SampleTargetDto) {
    const { age, isMale } = sampleTargetDto;

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
      .where(`sample.isDeleted=${false}`)
      .orderBy(
        `
        CASE
          WHEN (sample_target.age=${age} AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 1
          WHEN (sample_target.age=${age} AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 2
          WHEN (sample_target.age=${age} AND sample_target.isMale IS NULL) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 3
          WHEN (sample_target.age=${age} AND sample_target.isMale IS NULL) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 4
          WHEN (sample_target.age IS NULL AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 5
          WHEN (sample_target.age IS NULL AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 6
          WHEN (sample_target.age IS NULL AND sample_target.isMale IS NULL) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 7
          WHEN (sample_target.age IS NULL AND sample_target.isMale IS NULL) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 8
          WHEN (sample_target.age=${age} AND sample_target.isMale!=${isMale}) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 9
          WHEN (sample_target.age=${age} AND sample_target.isMale!=${isMale}) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 10
          WHEN (sample_target.age!=${age} AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt < SYSDATE() AND sample_target_time.endAt > SYSDATE()) THEN 11
          WHEN (sample_target.age!=${age} AND sample_target.isMale=${isMale}) AND
            (sample_target_time.startAt > SYSDATE() OR sample_target_time.endAt < SYSDATE()) THEN 12      
          ELSE 13
        END
      `,
        'ASC',
      )
      .getMany();
  }
}
