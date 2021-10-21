import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { SampleInfo } from './sampleInfo.entity';
import { SampleStock } from './sampleStock.entity';
import { Stock } from '../../stock/stock.entity';
import { Customer } from '../../customer/customer.entity';
import { SampleTarget } from './sampleTarget.entity';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  image: string;
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
  sampleInfo: SampleInfo;
  @OneToOne(() => SampleStock, (sampleStock) => sampleStock.sample)
  sampleStock: SampleStock;
  @OneToOne(() => SampleTarget, (sampleTarget) => sampleTarget.sample)
  sampleTarget: SampleTarget;
  @OneToMany(() => Stock, (stock) => stock.sample)
  stocks: Stock[];
  @OneToMany(() => Customer, (customer) => customer.sample)
  customers: Customer[];
}
