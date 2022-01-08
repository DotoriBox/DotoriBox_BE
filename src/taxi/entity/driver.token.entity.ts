import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class DriverToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  accessToken: string;
  @Column()
  refreshToken: string;
  @OneToOne(() => Driver, (driver) => driver.driverTaxiLicense)
  driver: Driver;
  @Column({ nullable: true })
  driverId: number;
}
