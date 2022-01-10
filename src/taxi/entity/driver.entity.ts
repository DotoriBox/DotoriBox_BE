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
import { Taxi } from './taxi.entity';
import { DriverLicense } from './driver.license.entity';
import { DriverTaxiLicense } from './driver.taxiLicense.entity';
import { TaxiPlatform } from './taxi.platform.entity';
import { DriverToken } from './driver.token.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  driverName: string;
  @Column()
  phoneNumber: string;
  @Column()
  accountNumber: string;
  @Column()
  drivingTime: number;
  @Column()
  residence: string;
  @Column({ default: false })
  isDeleted: boolean;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
  @OneToOne(() => Taxi, (taxi) => taxi.driver)
  @JoinColumn()
  taxi: Taxi;
  @Column({ nullable: true })
  taxiId: number;
  @OneToOne(() => DriverLicense, (driverLicense) => driverLicense.driver)
  driverLicense: DriverLicense;
  @OneToOne(
    () => DriverTaxiLicense,
    (driverTaxiLicense) => driverTaxiLicense.driver,
  )
  driverTaxiLicense: DriverTaxiLicense;
  @OneToOne(() => DriverToken, (driverToken) => driverToken.driver)
  driverToken: DriverToken;
  @ManyToOne(() => TaxiPlatform, (taxiPlatform) => taxiPlatform.taxis)
  taxiPlatform: TaxiPlatform;
}
