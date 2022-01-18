import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { DriverInfo } from '../info.entity';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ default: false })
  isDeleted: boolean;
  @OneToMany(() => DriverInfo, (driverInfo) => driverInfo.platform)
  @JoinColumn()
  driverInfos: DriverInfo[];
}
