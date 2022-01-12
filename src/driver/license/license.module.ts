import { Module } from '@nestjs/common';
import { TaxiModule } from './taxi/taxi.module';
import { DrivingModule } from './driving/driving.module';

@Module({
  imports: [TaxiModule, DrivingModule]
})
export class LicenseModule {}
