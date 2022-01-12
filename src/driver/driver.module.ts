import { Module } from '@nestjs/common';
import { LicenseModule } from './license/license.module';
import { InfoModule } from './info/info.module';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { TokenModule } from './token/token.module';

@Module({
  imports: [LicenseModule, InfoModule, TokenModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
