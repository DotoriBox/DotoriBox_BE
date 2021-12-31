import { TaxiPlatformDto } from './driver.taxiPlatform.dto';

export class DriverDto {
  id?: number;
  driverName?: string;
  phoneNumber?: string;
  accountNumber?: string;
  group?: string;
  platformId: number;
  platform: TaxiPlatformDto;
  drivingTime: number;
  residence: string;
  isDeleted?: boolean;
  taxiId?: number;
}
