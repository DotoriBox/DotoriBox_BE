import { Driver } from 'src/driver/driver.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LicenseImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  driverLicenseImage: string;
  @Column()
  taxiLicenseImage: string;
  @Column({ nullable: true })
  driverId: number;
  @OneToOne(() => Driver, (driver) => driver.licenseImage)
  @JoinColumn()
  driver: Driver;
}
