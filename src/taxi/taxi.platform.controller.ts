import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiPlatformDto } from './dto/taxi.platform.dto';

@Controller('platform')
export class TaxiPlatformController {
  constructor(private readonly taxiService: TaxiService) {}

  @Post()
  async createTaxiPlatform(@Body() taxiPlatformDto: TaxiPlatformDto) {
    return this.taxiService.createTaxiPlatform(taxiPlatformDto);
  }

  @Put(':taxiPlatformId')
  async updateTaxi(
    @Param() taxiPlatformId: number,
    @Body() taxiPlatformDto: TaxiPlatformDto,
  ) {
    return this.taxiService.updateTaxiPlatform(taxiPlatformDto, taxiPlatformId);
  }
}
