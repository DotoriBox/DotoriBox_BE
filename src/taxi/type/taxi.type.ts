import { DriverDto } from '../dto/driver.dto';
import { DriverLicenseDto } from '../dto/driver.license.dto';
import { DriverTaxiLicenseDto } from '../dto/driver.taxiLicense.dto';

export type TaxiBody = {
  taxiNumber: number;
  driver: DriverDto;
  driverLicense: DriverLicenseDto;
  driverTaxiLicense: DriverTaxiLicenseDto;
};
