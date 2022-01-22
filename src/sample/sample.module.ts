import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './sample.entity';
import { Stock } from '../stock/stock.entity';
import { SampleInfo } from './info/info.entity';
import { SampleStock } from './stock/stock.entity';
import { CustomerModule } from '../customer/customer.module';
import { SampleTarget } from './target/target.entity';
import { SampleTargetTime } from './target/time/time.entity';
import { InfoModule } from './info/info.module';
import { StockModule } from './stock/stock.module';
import { TargetModule } from './target/target.module';
import { SampleTimeController } from './target/time/time.controller';
import { TimeModule } from './target/time/time.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sample,
      Stock,
      SampleInfo,
      SampleStock,
      SampleTarget,
      SampleTargetTime,
    ]),
    CustomerModule,
    InfoModule,
    StockModule,
    TargetModule,
    TimeModule,
  ],
  controllers: [SampleController, SampleTimeController],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}
