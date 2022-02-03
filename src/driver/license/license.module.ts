import { Module } from '@nestjs/common';
import { TaxiModule } from './taxi/taxi.module';
import { DrivingModule } from './driving/driving.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [TaxiModule, DrivingModule, ImageModule],
  exports: [],
})
export class LicenseModule {}
