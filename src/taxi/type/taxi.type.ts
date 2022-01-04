import { DriverDto } from '../dto/driver.dto';
import { DriverLicenseDto } from '../dto/driver.license.dto';
import { DriverTaxiLicenseDto } from '../dto/driver.taxiLicense.dto';
import { TaxiPlatformDto } from '../dto/taxi.platform.dto';

export type TaxiBody = {
  taxiNumber: number;
  taxiPlatform: TaxiPlatformDto;
  driver: DriverDto;
  driverLicense: DriverLicenseDto;
  driverTaxiLicense: DriverTaxiLicenseDto;
};
