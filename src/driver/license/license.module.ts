import { Module, forwardRef } from '@nestjs/common';
import { TaxiModule } from './taxi/taxi.module';
import { DrivingModule } from './driving/driving.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [TaxiModule, forwardRef(() => DrivingModule), ImageModule],
  exports: [],
})
export class LicenseModule {}
