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
import { SampleTargetDto } from '../../sample/target/target.dto';
import { SampleService } from '../../sample/sample.service';
import { CustomerService } from '../../customer/customer.service';

@Controller('taxi')
export class TaxiController {
  constructor(
    private readonly taxiService: TaxiService,
    private readonly stockService: StockService,
    private readonly sampleService: SampleService,
    private readonly customerService: CustomerService,
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

  @Get(':taxiId/customer')
  async getCustomers(@Param('taxiId') taxiId: number) {
    return this.customerService.getAllCustomerByTaxiId(taxiId);
  }

  @Get(':taxiId/sample/:sampleId')
  async getStockByStockId(
    @Param('taxiId') taxiId: number,
    @Param('sampleId') sampleId: number,
  ) {
    return this.stockService.getStock({ taxiId, sampleId });
  }

  @Get(':taxiId/stock')
  async getStockInTaxi(@Param('taxiId') taxiId: number) {
    return this.stockService.getStockAll(taxiId, {});
  }
}
