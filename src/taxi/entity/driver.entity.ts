import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Taxi } from './taxi.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  driverName: string;
  @Column()
  phoneNumber: string;
  @Column()
  licensePlate: string;
  @Column()
  accountNumber: string;
  @Column()
  group: string;
  @Column()
  isDeleted: boolean;
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
  @OneToOne(() => Taxi, (taxi) => taxi.driver)
  taxi: Taxi;
}
