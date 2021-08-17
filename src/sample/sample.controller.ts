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
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../lib/multerOptions';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}
  @Post('/')
  async createSample(@Body() sampleDto: SampleDto) {
    return this.sampleService.createSample(sampleDto);
  }

  @Get('/')
  async getAllSample(@Query() query) {
    return this.sampleService.getSampleAll(query);
  }

  @Get(':sampleId/image')
  async getSampleImage(
    @Res() res: Response,
    @Param('sampleId') sampleId: number,
  ) {
    const result: any = await this.sampleService.getSampleImage(+sampleId);
    res.download('./uploads/' + result.image);
  }

  @Get(':sampleId')
  async getSample(@Param('sampleId') sampleId: number) {
    return this.sampleService.findSample(sampleId);
  }

  @Put(':sampleId')
  async updateSample(
    @Param('sampleId') sampleId: number,
    @Body() sampleDto: SampleDto,
  ) {
    return this.sampleService.updateSample(sampleId, sampleDto);
  }

  @UseInterceptors(FilesInterceptor('attachments', null, multerOptions))
  @Put(':sampleId/image')
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
