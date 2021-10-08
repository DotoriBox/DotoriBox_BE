import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Sample } from './entity/sample.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleDto } from './dto/sample.dto';
import { unlink } from 'fs/promises';
import { Stock } from '../stock/stock.entity';
import { SampleInfo } from './entity/sampleInfo.entity';
import { SampleStock } from './entity/sampleStock.entity';
import { SampleTarget } from './entity/sampleTarget.entity';
import { SampleTargetDto } from './dto/sampleTarget.dto';

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
  ) {}

  async updateSample(sampleId: number, sampleDto: SampleDto) {
    if (sampleDto.sampleInfo) {
      await this.sampleInfoRepository.update(
        {
          sampleId,
        },
        sampleDto.sampleInfo,
      );

      delete sampleDto.sampleInfo;
    }

    if (sampleDto.sampleStock) {
      await this.sampleStockRepository.update(
        {
          sampleId,
        },
        sampleDto.sampleStock,
      );

      delete sampleDto.sampleStock;
    }

    if (sampleDto.sampleTarget) {
      await this.sampleTargetRepository.update(
        {
          sampleId,
        },
        sampleDto.sampleTarget,
      );

      delete sampleDto.sampleTarget;
    }

    const result = await this.sampleRepository.update(
      {
        id: sampleId,
        isDeleted: false,
      },
      sampleDto,
    );

    if (!result) throw new NotFoundException();

    return result;
  }

  async findSample(sampleId: number) {
    const result = await this.sampleRepository.findOne({
      where: {
        id: sampleId,
        isDeleted: false,
      },
      relations: ['sampleInfo', 'sampleStock', 'sampleTarget'],
    });

    if (!result) throw new NotFoundException();
    return result;
  }

  async createSample(sampleDto: SampleDto) {
    await this.sampleInfoRepository.save(sampleDto.sampleInfo);
    await this.sampleStockRepository.save(sampleDto.sampleStock);
    await this.sampleTargetRepository.save(sampleDto.sampleTarget);

    return this.sampleRepository.save(sampleDto);
  }

  async getSampleAll(query: Record<string, unknown>) {
    let isDeleted = query.isDeleted;
    if (!isDeleted) isDeleted = false;
    return this.sampleRepository.find({
      where: {
        isDeleted,
      },
      relations: ['sampleInfo', 'sampleStock', 'sampleTarget'],
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
    const result: any = await this.sampleRepository.update(
      {
        id: sampleId,
        isDeleted: false,
      },
      {
        image: file.filename,
      },
    );

    if (!result) throw new NotFoundException();
    if (result.image !== undefined) await unlink('./uploads/' + result.image);
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

  async recommendSample(sampleTargetDto: SampleTargetDto) {
    const { isMale, age, startTime, endTime } = sampleTargetDto;

    return this.sampleRepository
      .createQueryBuilder('sample')
      .innerJoinAndSelect('sample.sampleInfo', 'sample_info')
      .innerJoinAndSelect('sample.sampleStock', 'sample_stock')
      .innerJoinAndSelect('sample.sampleTarget', 'sample_target')
      .orderBy(
        `case 
        when age=${age} and (isMale is null or isMale=${isMale}) then 1 
        when age is null and (isMale is null or isMale=${isMale}) then 2 
        else 3 
        end`,
      )
      .getMany();
  }
}
