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

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async updateSample(sampleId: number, sampleDto: SampleDto) {
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
      id: sampleId,
      isDeleted: false,
    });

    if (!result) throw new NotFoundException();
    return result;
  }

  async createSample(sampleDto: SampleDto) {
    return this.sampleRepository.create(sampleDto);
  }

  async getSampleAll(query: Record<string, unknown>) {
    let isDeleted = query.isDeleted;
    if (!isDeleted) isDeleted = false;
    return this.sampleRepository.find({
      where: {
        isDeleted,
      },
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
    if (result.image !== undefined) unlink('./uploads/' + result.image);
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
}
