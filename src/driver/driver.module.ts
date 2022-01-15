import { forwardRef, Module } from '@nestjs/common';
import { LicenseModule } from './license/license.module';
import { InfoModule } from './info/info.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TokenModule } from './token/token.module';
import { TaxiModule } from './taxi/taxi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';

@Module({
  imports: [
    LicenseModule,
    InfoModule,
    TaxiModule,
    TypeOrmModule.forFeature([Driver]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
