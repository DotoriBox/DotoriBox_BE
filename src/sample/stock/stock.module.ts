import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleStock } from './stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleStock])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
