import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class DriverTaxiLicense {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  licenseNumber: number;
  @Column()
  registrationNumber: string;
  @Column()
  TaxiLicensePic: string;
  @OneToOne(() => Driver, (driver) => driver.driverTaxiLicense)
  driver: Driver;
  @Column({ nullable: true })
  driverId: number;
}
