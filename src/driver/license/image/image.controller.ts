import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOptions';
import { ImageService } from './image.service';
import { ImageDto } from './image.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('taxi-license')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('taxi_license')),
  )
  async createTaxiLicenseImage(@UploadedFile() file) {
    return file.key.split('/')[file.key.split('/').length - 1];
  }

  @Post('driver-license')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('driver_license')),
  )
  async createDriverLicenseImage(@UploadedFile() file) {
    return file.key.split('/')[file.key.split('/').length - 1];
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
