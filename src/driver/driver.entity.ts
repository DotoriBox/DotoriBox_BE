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

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => DriverInfo, (driverInfo) => driverInfo.driver)
  driverInfo: DriverInfo;
}
