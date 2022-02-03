import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOptions';
import { ImageService } from './image.service';
import { ImageDto } from './image.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('taxi-license')
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('taxi_license')),
  )
  async createTaxiLicenseImage(file: Express.Multer.File) {
    return file.filename;
  }

  @Post('driver-license')
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('driver-license')),
  )
  async createDriverLicenseImage(file: Express.Multer.File) {
    return file.filename;
  }

  @Post()
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
