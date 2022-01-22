import { forwardRef, Module } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { PlatformModule } from '../info/platform/platform.module';
import { Taxi } from './taxi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from '../../stock/stock.module';
import { SampleModule } from '../../sample/sample.module';
import { CustomerModule } from '../../customer/customer.module';

@Module({
  imports: [
    SampleModule,
    PlatformModule,
    StockModule,
    CustomerModule,
    TypeOrmModule.forFeature([Taxi]),
  ],
  providers: [TaxiService],
  controllers: [TaxiController],
  exports: [TaxiService],
})
export class TaxiModule {}
