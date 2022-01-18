import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DriverInfo } from './info/info.entity';
import { DriverToken } from './token/token.entity';
import { DrivingLicense } from './license/driving/driving.entity';
import { TaxiLicense } from './license/taxi/taxi.entity';
import { Taxi } from './taxi/taxi.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.driver)
  driverInfo: DriverInfo;
  @OneToOne(() => DriverToken, (driverToken) => driverToken.driver)
  token: DriverToken;
  @OneToOne(() => DrivingLicense, (drivingLicense) => drivingLicense.driver)
  drivingLicense: DrivingLicense;
  @OneToOne(() => TaxiLicense, (taxiLicense) => taxiLicense.driver)
  taxiLicense: TaxiLicense;
  @OneToOne(() => Taxi, (taxi) => taxi.driver)
  taxi: Taxi;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
