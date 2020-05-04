import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Event } from './Event';

@Entity()
export class Number {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Event, (event) => event.id)
  @JoinColumn({ name: 'event_id' })
  event: number;

  @Column({ type: 'tinyint' })
  type: number;

  @Column({ length: 4 })
  number: string;

  @Column({ name: 'first_num', type: 'tinyint' })
  firstNum: number;

  @Column({ name: 'second_num', type: 'tinyint' })
  secondNum: number;

  @Column({ name: 'third_num', type: 'tinyint' })
  thirdNum: number;

  @Column({ name: 'fourth_num', type: 'tinyint', nullable: true })
  fourthNum: number;
}
