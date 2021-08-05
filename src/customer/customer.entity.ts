import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Taxi } from '../taxi/entity/taxi.entity';
import { Sample } from '../sample/entity/sample.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  sampleId: number;
  @Column({ default: true })
  isMale: boolean;
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
  @ManyToOne(() => Taxi, (taxi) => taxi.customers)
  taxi: Taxi;
  @ManyToOne(() => Sample, (sample) => sample.customers)
  sample: Sample;
}
