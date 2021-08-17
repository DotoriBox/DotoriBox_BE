import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entity/sample.entity';
import { Stock } from '../stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sample, Stock])],
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
