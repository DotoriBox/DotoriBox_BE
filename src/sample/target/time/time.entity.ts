import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SampleTarget } from '../target.entity';

@Entity()
export class SampleTargetTime {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  startAt: Date;
  @Column()
  endAt: Date;
  @OneToMany(
    () => SampleTarget,
    (sampleTarget) => sampleTarget.sampleTargetTime,
  )
  sampleTarget: SampleTarget[];
  @Column({ default: false })
  isDeleted: boolean;
  // @AfterLoad()
  // updateTime() {
  //   const result = calculateDate(this.startAt, this.endAt);
  //   this.startAt = result.startAt;
  //   this.endAt = result.endAt;
  // }
}
