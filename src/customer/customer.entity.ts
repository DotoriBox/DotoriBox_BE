import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sample } from '../sample/sample.entity';
import { Taxi } from '../driver/taxi/taxi.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: true })
  isMale: boolean;
  @Column()
  age: number;
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
  @Column({ nullable: true })
  taxiId: number;
  @ManyToOne(() => Sample, (sample) => sample.customers)
  sample: Sample;
  @Column({ nullable: true })
  sampleId: number;
  @Column({ nullable: true })
  phone: string;
}
