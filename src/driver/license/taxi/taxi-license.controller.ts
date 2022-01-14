import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaxiLicenseService } from './taxi-license.service';
import { TaxiLicenseDto } from './taxi.dto';

@Controller('taxi-license')
export class TaxiLicenseController {
  constructor(private readonly taxiLicenseService: TaxiLicenseService) {}

  @Get()
  async getTaxiLicense() {
    return this.taxiLicenseService.getTaxiLicense();
  }

  @Get(':id')
  async getTaxiLicenseById(@Param('id') id: number) {
    return this.taxiLicenseService.getTaxiLicenseById(id);
  }

  @Post()
  async createTaxiLicense(@Body() taxiLicense: TaxiLicenseDto) {
    return this.taxiLicenseService.createTaxiLicense(taxiLicense);
  }

  @Put(':id')
  async editTaxiLicense(
    @Param('id') id: number,
    @Body() taxiLicense: TaxiLicenseDto,
  ) {
    return this.taxiLicenseService.updateTaxiLicense(id, taxiLicense);
  }
}
