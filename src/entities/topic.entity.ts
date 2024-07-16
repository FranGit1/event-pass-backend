import { Entity, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';
import {AutoMap} from "@automapper/classes";

@Entity()
export class Topic extends BaseEntity{
  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @OneToMany(() => Event, event => event.topic)
  events: Event[];
}
