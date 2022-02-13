import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOptions';
import { ImageService } from './image.service';
import { ImageDto } from './image.dto';
import { AuthGuard } from '../../../auth/guard/naver-auth.guard';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('taxi-license')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('taxi_license')),
  )
  async createTaxiLicenseImage(@UploadedFile() file) {
    return file.key.split('/')[file.key.split('/').length - 1];
  }

  @Post('driver-license')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('driver_license')),
  )
  async createDriverLicenseImage(@UploadedFile() file) {
    return file.key.split('/')[file.key.split('/').length - 1];
  }

  @Post()
  @UseGuards(AuthGuard)
  async createImageData(
    @Body() imageDto: ImageDto,
    @Param('driverId') driverId: number,
  ) {
    return this.imageService.setLicenseImage(
      driverId,
      imageDto.driverLicenseImage,
      imageDto.taxiLicenseImage,
    );
  }
}
