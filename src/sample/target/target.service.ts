import { Injectable } from '@nestjs/common';
import { SampleTargetDto } from './target.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SampleTarget } from './target.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleTargetService {
  constructor(
    @InjectRepository(SampleTarget)
    private readonly sampleTargetRepository: Repository<SampleTarget>,
  ) {}
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
}
