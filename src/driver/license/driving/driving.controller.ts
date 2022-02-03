import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DrivingService } from './driving.service';
import { DrivingLicenseDto } from './driving.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multerOptions';

@Controller('driving')
export class DrivingController {
  constructor(private readonly drivingService: DrivingService) {}
  @Get()
  async getDrivingLicense() {
    return this.drivingService.getDrivingLicense();
  }

  @Get(':id')
  async getDrivingLicenseById(@Param('id') id: number) {
    return this.drivingService.getDrivingLicenseById(id);
  }

  @Post()
  async createDrivingLicense(@Body() drivingLicense: DrivingLicenseDto) {
    return this.drivingService.createDrivingLicense(drivingLicense);
  }

  @Put(':id')
  async updateDrivingLicense(
    @Param() id: number,
    @Body() drivingLicense: DrivingLicenseDto,
  ) {
    return this.drivingService.updateDrivingLicense(id, drivingLicense);
  }

  @Put(':id/image')
  @UseInterceptors(FileInterceptor('attachments', multerOptions('driver_license')))
  async addDrivingLicenseImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Query('isFront') isFront: boolean
  ) {
    return this.drivingService.createDrivingLicenseImage(id, isFront, file);
  }
}
