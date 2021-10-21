import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleDto } from './dto/sample.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../lib/multerOptions';
import { CustomerService } from '../customer/customer.service';
import { SampleTargetDto } from './dto/sampleTarget.dto';
import { SampleTargetTimeDto } from './dto/sampleTargetTime.dto';

@Controller('sample')
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly customerService: CustomerService,
  ) {}
  @Post('/')
  async createSample(@Body() sampleDto: SampleDto) {
    return this.sampleService.createSample(sampleDto);
  }

  // @Get('/')
  // async getAllSample(@Query() query) {
  //   return this.sampleService.getSampleAll(query);
  // }

  // @Get('/')
  // async getRecommendSample(@Body() sampleTargetDto: SampleTargetDto) {
  //   return this.sampleService.recommendSample(sampleTargetDto);
  // }

  @Get(':sampleId/image')
  async getSampleImage(
    @Res() res: Response,
    @Param('sampleId') sampleId: number,
  ) {
    const result: any = await this.sampleService.getSampleImage(+sampleId);
    res.download('./image/' + result.image);
  }

  @Get(':sampleId')
  async getSample(@Param('sampleId') sampleId: number) {
    return this.sampleService.findSample(sampleId);
  }

  @Get(':sampleId/stat/customer')
  async getCustomerStat(@Param('sampleId') sampleId: number) {
    return this.customerService.mostCommonCustomer(sampleId);
  }

  @Put(':sampleId')
  async updateSample(
    @Param('sampleId') sampleId: number,
    @Body() sampleDto: SampleDto,
  ) {
    return this.sampleService.updateSample(sampleId, sampleDto);
  }

  @Put(':sampleId/image')
  @UseInterceptors(FileInterceptor('attachments', multerOptions))
  async attachImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('sampleId') sampleId: number,
  ) {
    return this.sampleService.createSampleImage(sampleId, file);
  }

  @Put(':sampleId/recover')
  async recoverSample(@Param('sampleId') sampleId: number) {
    return this.sampleService.recoverSample(sampleId);
  }

  @Delete(':sampleId')
  async deleteSample(@Param('sampleId') sampleId: number, @Query() query) {
    const { permanent } = query;
    return this.sampleService.deleteSample(sampleId, permanent);
  }
}

@Controller('sample-time')
export class SampleTimeController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  async createSampleTime(@Body() sampleTargetTimeDto: SampleTargetTimeDto) {
    return this.sampleService.createSampleTargetTime(sampleTargetTimeDto);
  }

  @Get()
  async getAllSampleTime() {
    return this.sampleService.getAllSampleTime();
  }

  @Put('/:sampleTimeId')
  async updateSampleTime(
    @Param('sampleTimeId') sampleTimeId: number,
    @Body() sampleTargetTime: SampleTargetTimeDto,
  ) {
    return this.sampleService.updateSampleTime(sampleTimeId, sampleTargetTime);
  }

  @Delete('/:sampleTimeId')
  async deleteSampleTime(@Param('sampleTimeId') sampleTimeId: number) {
    return this.sampleService.deleteSampleTime(sampleTimeId);
  }
}
