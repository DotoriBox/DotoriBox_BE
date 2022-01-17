import { Body, Controller, Post } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async createSample(@Body() stockDto: StockDto) {
    await this.stockService.checkStock(stockDto.sampleId, stockDto.taxiId);
    return this.stockService.createStock(stockDto);
  }
}
