import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './stock.entity';
import { Sample } from '../sample/sample.entity';
import { SampleStock } from '../sample/stock/stock.entity';
import { Taxi } from '../driver/taxi/taxi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Taxi, Sample, SampleStock])],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
