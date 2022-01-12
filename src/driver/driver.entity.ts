import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DriverInfo } from './info/info.entity';
import { DriverToken } from './token/token.entity';
import { DrivingLicense } from "./license/driving/driving.entity";
import { TaxiLicense } from "./license/taxi/taxi.entity";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.driver)
  driverInfo: DriverInfo;
  @OneToOne(() => DriverToken, (driverToken) => driverToken.driver)
  token: DriverToken;
  @OneToOne(() => DrivingLicense, (drivingLicense) => drivingLicense.driver)
  drivingLicense: DrivingLicense;
  @OneToOne(() => TaxiLicense, (taxiLicense) => taxiLicense.driver)
  taxiLicense: TaxiLicense;
}
