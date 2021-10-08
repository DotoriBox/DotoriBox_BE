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
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
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
