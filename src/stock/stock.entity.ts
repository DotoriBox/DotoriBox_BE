import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Sample } from '../sample/entity/sample.entity';
import { Taxi } from '../taxi/entity/taxi.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  stock: number;
  @Column()
  sales: number;
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
  @ManyToOne(() => Sample, (sample) => sample.stocks)
  sample: Sample;
  @Column({ nullable: true })
  sampleId: number;
  @ManyToOne(() => Taxi, (taxi) => taxi.customers)
  taxi: Taxi;
  @Column({ nullable: true })
  taxiId: number;
}
