import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiDto } from './taxi.dto';
import { StockService } from '../../stock/stock.service';
import { StockDto } from '../../stock/stock.dto';
import { SampleTargetDto } from '../../sample/dto/sampleTarget.dto';
import { SampleService } from '../../sample/sample.service';

@Controller('taxi')
export class TaxiController {
  constructor(
    private readonly taxiService: TaxiService,
    private readonly stockService: StockService,
    private readonly sampleService: SampleService,
  ) {}

  @Post()
  async createTaxi(@Body() taxiDto: TaxiDto) {
    return this.taxiService.createTaxi(taxiDto);
  }

  @Get(':number')
  async getTaxi(@Param('number') number: number) {
    return this.taxiService.getTaxi(number);
  }

  @Get(':taxiId/sample')
  async getSample(
    @Param('taxiId') taxiId: number,
    @Query() sampleTargetDto: SampleTargetDto,
  ) {
    return this.sampleService.recommendSample(taxiId, sampleTargetDto);
  }

  @Get('taxiId/sample/:sampleId')
  async getStockByStockId(
    @Param('taxiId') taxiId: number,
    @Param('sampleId') sampleId: number,
  ) {
    return this.stockService.getStock({ taxiId, sampleId });
  }
}
