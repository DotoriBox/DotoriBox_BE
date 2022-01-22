import { Module } from '@nestjs/common';
import { SampleTimeController } from './time.controller';
import { TimeService } from './time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampleTargetTime } from './time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SampleTargetTime])],
  controllers: [SampleTimeController],
  providers: [TimeService],
  exports: [TimeService],
})
export class TimeModule {}
