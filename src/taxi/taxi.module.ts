import { Module } from '@nestjs/common';
import { TaxiController } from './taxi.controller';
import { TaxiService } from './taxi.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taxi } from './entity/taxi.entity';
import { Driver } from './entity/driver.entity';
import { StockService } from '../stock/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Taxi, Driver])],
  controllers: [TaxiController],
  providers: [TaxiService, StockService],
})
export class TaxiModule {}
