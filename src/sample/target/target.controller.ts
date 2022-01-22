import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SampleTargetDto } from './target.dto';
import { SampleTargetService } from './target.service';

@Controller('target')
export class TargetController {
  constructor(private readonly sampleTargetService: SampleTargetService) {}
  @Post('/sample/:sampleId/target')
  async addTarget(
    @Body() sampleTarget: SampleTargetDto,
    @Param('sampleId') sampleId: number,
  ) {
    return this.sampleTargetService.createSampleTarget({
      ...sampleTarget,
      sampleId,
    });
  }

  @Delete('/sample/:sampleId')
  async deleteSampleTarget(
    @Body() sampleTargetDto: SampleTargetDto,
    @Param('sampleId') sampleId: number,
  ) {
    return this.sampleTargetService.deleteSampleTarget({
      ...sampleTargetDto,
      sampleId,
    });
  }
}
