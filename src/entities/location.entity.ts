import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';
import {AutoMap} from "@automapper/classes";

@Entity()
export class Location extends BaseEntity{

  @AutoMap()
  @Column()
  city: string;

  @AutoMap()
  @Column()
  country: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  latitude: string;

  @AutoMap()
  @Column()
  longitude: string;

  @AutoMap()
  @OneToOne(() => Event, event => event.location)
  @JoinColumn()
  event: Event;
}
