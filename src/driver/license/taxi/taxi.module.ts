import { Module } from '@nestjs/common';
import { TaxiLicenseService } from './taxi-license.service';
import { TaxiLicenseController } from './taxi-license.controller';
import { TaxiLicense } from './taxi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaxiLicense])],
  providers: [TaxiLicenseService],
  controllers: [TaxiLicenseController],
  exports: [TaxiLicenseService],
})
export class TaxiModule {}
