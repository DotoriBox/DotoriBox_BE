import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DrivingService } from './driving.service';
import { DrivingLicenseDto } from './driving.dto';

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
}
