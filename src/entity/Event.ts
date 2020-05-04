import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { Number } from './Number';

@Entity()
export class Event {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Index('event_times_uindex', { unique: true })
  @Column({ unsigned: true })
  times: number;

  @Index('event_date_uindex', { unique: true })
  @Column({ type: 'date' })
  date: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Number, (number) => number.event)
  number: number[];
}
