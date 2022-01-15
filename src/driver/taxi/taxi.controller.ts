import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
} from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiDto } from './taxi.dto';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}

  @Post()
  async createTaxi(taxiDto: TaxiDto) {
    return this.taxiService.createTaxi(taxiDto);
  }

  @Get(':id')
  async getTaxi(@Param('id') id: number) {
    return this.taxiService.getTaxi(id);
  }
}
