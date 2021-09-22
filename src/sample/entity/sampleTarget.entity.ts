import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sample } from './sample.entity';

@Entity()
export class SampleTarget {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  age: number;
  @Column()
  isMale: boolean;
  @Column()
  startTime: number;
  @Column()
  endTime: number;
  @OneToOne(() => Sample, (sample) => sample.sampleTarget)
  @JoinColumn()
  sample: Sample;
  @Column({ nullable: true })
  sampleId: number;
}
