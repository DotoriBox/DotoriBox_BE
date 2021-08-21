import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { Request } from 'express';
import { TaxiDto } from './dto/taxi.dto';
import { StockService } from '../stock/stock.service';
import { StockDto } from '../stock/stock.dto';

@Controller('taxi')
export class TaxiController {
  constructor(
    private readonly taxiService: TaxiService,
    private readonly stockService: StockService,
  ) {}
  @Post()
  async create(@Body() taxiDto: TaxiDto) {
    return this.taxiService.createTaxi(taxiDto);
  }

  @Post(':taxiId/sample')
  async createSample(@Param() params, @Body() stockDto: StockDto) {
    const { taxiId } = params;
    await this.stockService.checkStock(stockDto.sampleId, taxiId);
    return this.stockService.createStock(stockDto);
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

  @Get(':taxiId/stock')
  async getStock(@Param() params, @Query() query) {
    const { taxiId } = params;

    return this.stockService.getStockAll(taxiId, query);
  }

  @Get(':taxiId/sample/:sampleId')
  async getStockByStockId(@Param() params, @Body() stockDto: StockDto) {
    const { taxiId, sampleId } = params;
    stockDto = { ...stockDto, taxiId, sampleId };

    return this.stockService.getStock(stockDto);
  }

  @Put(':taxiId')
  async updateTaxi(@Param() params, @Body() taxiDto: TaxiDto) {
    const { taxiId } = params;

    await this.taxiService.checkTaxi(taxiDto);
    return this.taxiService.updateByTaxiId(taxiDto, taxiId);
  }

  @Put(':taxiId/recover')
  async recoverTaxi(@Param() params) {
    const { taxiId } = params;
    return this.taxiService.recoverDeletedTaxi(taxiId);
  }

  @Put(':taxiId/sample/:sampleId')
  async updateSample(
    @Param('sampleId') sampleId: number,
    @Body() stockDto: StockDto,
  ) {
    return this.stockService.updateStock(sampleId, stockDto);
  }

  @Delete(':taxiId')
  async deleteTaxi(@Param() params) {
    const { taxiId } = params;
    return this.taxiService.deleteTaxi(taxiId);
  }

  @Delete(':taxiId/sample/:sampleId')
  async deleteSample(@Param() params) {
    const { taxiId, sampleId } = params;
    return this.stockService.deleteStock(taxiId, sampleId);
  }
}
