import { Module } from '@nestjs/common';
import { SampleController, SampleTimeController } from './sample.controller';
import { SampleService } from './sample.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entity/sample.entity';
import { Stock } from '../stock/stock.entity';
import { SampleInfo } from './entity/sampleInfo.entity';
import { SampleStock } from './entity/sampleStock.entity';
import { CustomerModule } from '../customer/customer.module';
import { SampleTarget } from './entity/sampleTarget.entity';
import { SampleTargetTime } from './entity/sampleTargetTime.entity';

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
  ],
  controllers: [SampleController, SampleTimeController],
  providers: [SampleService],
})
export class SampleModule {}
