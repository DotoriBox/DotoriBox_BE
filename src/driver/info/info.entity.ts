import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from '../driver.entity';

@Entity()
export class DriverInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  phoneNumber: string;
  @Column()
  accountNumber: string;
  @Column()
  residence: string;
  @Column()
  drivingTime: number;
  @Column()
  isDeleted: boolean;
  @Column({ nullable: true })
  driverId: number;
  @OneToOne(() => Driver, (driver) => driver.driverInfo)
  driver: Driver;
}
