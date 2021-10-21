import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
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
  @OneToOne(() => Sample, (sample) => sample.sampleTarget)
  @JoinColumn()
  sample: Sample;
  @Column({ nullable: true })
  sampleId: number;
}
