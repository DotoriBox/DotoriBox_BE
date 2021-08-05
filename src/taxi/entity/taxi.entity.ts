import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Driver } from './driver.entity';
import { Customer } from '../../customer/customer.entity';

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
  @JoinColumn()
  driver: Driver;
  @OneToMany(() => Customer, (customer) => customer.taxi)
  customers: Customer[];
}
