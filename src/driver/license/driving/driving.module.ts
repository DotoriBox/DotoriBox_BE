import { Module } from '@nestjs/common';
import { DrivingService } from './driving.service';
import { DrivingController } from './driving.controller';

@Module({
  imports: [],
  providers: [DrivingService],
  controllers: [DrivingController]
})
export class DrivingModule {}
