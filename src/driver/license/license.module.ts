import { Module } from '@nestjs/common';
import { TaxiModule } from './taxi/taxi.module';
import { DrivingModule } from './driving/driving.module';
import { TaxiLicenseService } from './taxi/taxi-license.service';
import { DrivingService } from './driving/driving.service';

@Module({
  imports: [TaxiModule, DrivingModule],
  exports: [],
})
export class LicenseModule {}
