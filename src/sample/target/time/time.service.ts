import { Injectable } from '@nestjs/common';
import { SampleTargetTimeDto } from './time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleTargetTime } from './time.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(SampleTargetTime)
    private readonly sampleTargetTimeRepository: Repository<SampleTargetTime>,
  ) {}
  async createSampleTargetTime(sampleTargetTime: SampleTargetTimeDto) {
    const duplicate = await this.sampleTargetTimeRepository.findOne({
      startAt: sampleTargetTime.startAt,
      endAt: sampleTargetTime.endAt,
      isDeleted: false,
    });

    if (duplicate) throw Error('Duplicated Time');

    return this.sampleTargetTimeRepository.save(sampleTargetTime);
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
