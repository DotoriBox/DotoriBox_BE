import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
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
  async createTaxiLicenseImage(file: Express.Multer.File) {
    return file.filename;
  }

  @Post('driver-license')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('attachments', multerOptions('driver_license')),
  )
  async createDriverLicenseImage(file: Express.Multer.File) {
    return file.filename;
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
