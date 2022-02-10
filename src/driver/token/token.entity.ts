import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Driver } from '../driver.entity';

@Entity()
export class DriverToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 300 })
  accessToken: string;
  @Column({ length: 300 })
  refreshToken: string;
  @Column({ nullable: true })
  driverId: number;
  @OneToOne(() => Driver, (driver) => driver.token)
  @JoinColumn()
  driver: Driver;
}
