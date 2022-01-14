import { Module } from '@nestjs/common';
import { DrivingService } from './driving.service';
import { DrivingController } from './driving.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrivingLicense } from './driving.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrivingLicense])],
  providers: [DrivingService],
  controllers: [DrivingController],
  exports: [DrivingService],
})
export class DrivingModule {}
