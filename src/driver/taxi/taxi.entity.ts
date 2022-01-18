import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Driver } from '../driver.entity';
import { Platform } from '../info/platform/platform.entity';
import { Customer } from '../../customer/customer.entity';
import { Stock } from '../../stock/stock.entity';

@Entity()
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  isDeleted: boolean;
  @OneToMany(() => Customer, (customer) => customer.taxi)
  customers: Customer[];
  @Column({ nullable: true })
  taxiNumber: number;
  @Column({ nullable: true })
  driverId: number;
  @OneToOne(() => Driver, (driver) => driver.taxi)
  @JoinColumn()
  driver: Driver;
  @OneToMany(() => Stock, (stock) => stock.taxi)
  stocks: Stock[];
  //  passenger는 select alias로 해결
}
