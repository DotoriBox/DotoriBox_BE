import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Taxi } from '../taxi.entity';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: false })
  isDeleted: boolean;
  @OneToMany(() => Taxi, (taxi) => taxi.platform)
  @JoinColumn()
  taxis: Taxi[];
}
