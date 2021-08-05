import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Sample } from '../sample/entity/sample.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  stock: number;
  @Column()
  sales: number;
  @Column()
  taxiId: number;
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
}
