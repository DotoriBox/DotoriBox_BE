import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './driver.entity';
import { Customer } from '../../customer/customer.entity';
import { Stock } from '../../stock/stock.entity';
import { TaxiPlatform } from './taxi.platform.entity';

@Entity()
export class Taxi {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  taxiNumber: number;
  @Column()
  group: string;
  @Column({ default: false })
  isDeleted: boolean;
  @Column({ nullable: true })
  platformId: number;
  @ManyToOne(() => TaxiPlatform, (taxiPlatform) => taxiPlatform.taxis)
  @JoinColumn()
  platform: TaxiPlatform;
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
