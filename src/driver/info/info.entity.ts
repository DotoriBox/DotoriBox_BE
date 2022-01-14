import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../driver.entity';

@Entity()
export class DriverInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
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
}
