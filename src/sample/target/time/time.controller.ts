import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SampleTargetTimeDto } from './time.dto';
import { TimeService } from './time.service';

@Controller('sample-time')
export class SampleTimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  async createSampleTime(@Body() sampleTargetTimeDto: SampleTargetTimeDto) {
    return this.timeService.createSampleTargetTime(sampleTargetTimeDto);
  }

  @Get()
  async getAllSampleTime() {
    return this.timeService.getAllSampleTime();
  }

  @Put('/:sampleTimeId')
  async updateSampleTime(
    @Param('sampleTimeId') sampleTimeId: number,
    @Body() sampleTargetTime: SampleTargetTimeDto,
  ) {
    return this.timeService.updateSampleTime(sampleTimeId, sampleTargetTime);
  }

  @Delete('/:sampleTimeId')
  async deleteSampleTime(@Param('sampleTimeId') sampleTimeId: number) {
    return this.timeService.deleteSampleTime(sampleTimeId);
  }
}
