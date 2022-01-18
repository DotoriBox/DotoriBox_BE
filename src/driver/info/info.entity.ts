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
  @Column({ nullable: true })
  residence: string;
  @Column({ nullable: true })
  drivingTime: number;
  @Column({ default: false })
  isDeleted: boolean;
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
