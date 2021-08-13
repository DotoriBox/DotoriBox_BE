import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Driver } from './driver.entity';
import { Customer } from '../../customer/customer.entity';
import { Stock } from '../../stock/stock.entity';

@Entity()
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taxiNumber: number;
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
  @OneToOne(() => Driver, (driver) => driver.taxi)
  driver: Driver;
  @OneToMany(() => Stock, (stock) => stock.taxi)
  stocks: Stock[];
  @OneToMany(() => Customer, (customer) => customer.taxi)
  customers: Customer[];
  //  passenger는 select alias로 해결
}
