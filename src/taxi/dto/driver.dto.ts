import { DriverLicenseDto } from './driver.license.dto';
import { DriverTaxiLicenseDto } from './driver.taxiLicense.dto';

export class DriverDto {
  id?: number;
  driverName?: string;
  phoneNumber?: string;
  accountNumber?: string;
  group?: string;
  platform: number;
  drivingStartTime: Date;
  drivingEndTime: Date;
  residence: string;
  isDeleted?: boolean;
  taxiId?: number;
  driverLicense: DriverLicenseDto;
  driverTaxiLicense: DriverTaxiLicenseDto;
}
