export class DriverDto {
  id?: number;
  driverName?: string;
  phoneNumber?: string;
  accountNumber?: string;
  group?: string;
  platform: number;
  drivingStart: Date;
  drivingEnd: Date;
  residence: string;
  isDeleted?: boolean;
  taxiId?: number;
}
