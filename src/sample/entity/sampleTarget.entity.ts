import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sample } from './sample.entity';
import { SampleTargetTime } from './sampleTargetTime.entity';
import { calculateDate } from '../../lib/util';

@Entity()
export class SampleTarget {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  isMale: boolean;
  @Column({ nullable: true })
  sampleTargetTimeId: number;
  @ManyToOne(
    () => SampleTargetTime,
    (sampleTargetTime) => sampleTargetTime.sampleTarget,
  )
  sampleTargetTime: SampleTargetTime;
  @ManyToOne(() => Sample, (sample) => sample.sampleTargets)
  @JoinColumn()
  sample: Sample;
  @Column({ nullable: true })
  sampleId: number;
}
