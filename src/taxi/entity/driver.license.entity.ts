import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class DriverLicense {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  licenseNumber: string;
  @Column()
  regNumber: string;
  @Column()
  passcode: string;
  @OneToOne(() => Driver, (driver) => driver.driverLicense)
  @JoinColumn()
  driver: Driver;
  @Column({ nullable: true })
  driverId: number;
}
