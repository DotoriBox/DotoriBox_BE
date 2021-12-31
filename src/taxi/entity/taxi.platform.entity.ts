import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Driver } from './driver.entity';

@Entity()
export class TaxiPlatform {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Driver, (driver) => driver.platform)
  taxis: Driver[];
}
