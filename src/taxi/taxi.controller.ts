import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { Request } from 'express';
import { TaxiDto } from './dto/taxi.dto';

@Controller('taxi')
export class TaxiController {
  constructor(private readonly taxiService: TaxiService) {}
  @Post()
  async create(@Body() taxiDto: TaxiDto) {
    return this.taxiService.createTaxi(taxiDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const { isDeleted } = req.body;
    return this.taxiService.getAllTaxi(isDeleted, req.query);
  }

  @Get(':taxiNumber')
  async findOne(@Param() params) {
    return this.taxiService.getTaxiByTaxiNumber(params.taxiNumber);
  }

  @Put(':taxiId')
  async updateTaxi(@Param() params, @Body() taxiDto: TaxiDto) {
    const { taxiId } = params;

    await this.taxiService.checkTaxi(taxiDto);
    return this.taxiService.updateByTaxiId(taxiDto, taxiId);
  }
}
