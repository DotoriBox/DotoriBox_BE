import { Module } from '@nestjs/common';
import { LicenseModule } from './license/license.module';
import { InfoModule } from './info/info.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [LicenseModule, InfoModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
