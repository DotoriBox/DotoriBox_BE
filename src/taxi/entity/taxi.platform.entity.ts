import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Taxi } from './taxi.entity';

@Entity()
export class TaxiPlatform {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Taxi, (taxi) => taxi.platform)
  taxis: Taxi[];
}
