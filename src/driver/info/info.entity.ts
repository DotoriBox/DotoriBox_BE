import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../driver.entity';
import { Platform } from './platform/platform.entity';

@Entity()
export class DriverInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  isCorporation: boolean;
  @Column({ nullable: true })
  accountNumber: string;
  @Column()
  residence: string;
  @Column()
  drivingTime: number;
  @Column({ default: false })
  isDeleted: boolean;
  @Column({ default: 'driver' })
  role: string;
  @Column({ nullable: true })
  driverId: number;
  @OneToOne(() => Driver, (driver) => driver.driverInfo)
  @JoinColumn()
  driver: Driver;
  @Column({ nullable: true })
  platformId: number;
  @ManyToOne(() => Platform, (taxiPlatform) => taxiPlatform.driverInfos)
  @JoinColumn()
  platform: Platform;
}
