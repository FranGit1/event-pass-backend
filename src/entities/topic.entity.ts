import { Entity, Column, OneToMany } from 'typeorm';
import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';

@Entity()
export class Topic extends BaseEntity{
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Event, event => event.topic)
  events: Event[];
}
