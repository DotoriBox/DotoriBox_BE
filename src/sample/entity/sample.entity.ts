import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SampleInfo } from './sampleInfo.entity';
import { SampleStock } from './sampleStock.entity';
import { Stock } from '../../stock/stock.entity';
import { Customer } from '../../customer/customer.entity';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  explain: string;
  @Column()
  sampleName: string;
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
  @OneToOne(() => SampleInfo, (sampleInfo) => sampleInfo.sample)
  @JoinColumn()
  sampleInfo: SampleInfo;
  @OneToOne(() => SampleStock, (sampleStock) => sampleStock.sample)
  @JoinColumn()
  sampleStock: SampleStock;
  @OneToMany(() => Stock, (stock) => stock.sample)
  stocks: Stock[];
  @OneToMany(() => Customer, (customer) => customer.sample)
  customers: Customer[];
}
