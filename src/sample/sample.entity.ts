import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { SampleInfo } from './info/info.entity';
import { SampleStock } from './stock/stock.entity';
import { Stock } from '../stock/stock.entity';
import { Customer } from '../customer/customer.entity';
import { SampleTarget } from './target/target.entity';

@Entity()
export class Sample {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  cardImage: string;
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
  @OneToMany(() => SampleTarget, (sampleTarget) => sampleTarget.sample)
  sampleTargets: SampleTarget[];
  @OneToMany(() => Stock, (stock) => stock.sample)
  stocks: Stock[];
  @OneToMany(() => Customer, (customer) => customer.sample)
  customers: Customer[];
}
