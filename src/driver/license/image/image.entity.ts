import { Driver } from 'src/driver/driver.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class LicenseImage {
  @PrimaryColumn()
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
