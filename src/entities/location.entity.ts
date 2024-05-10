import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';

@Entity()
export class Location extends BaseEntity{


  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToOne(() => Event, event => event.location)
  @JoinColumn()
  event: Event;
}
