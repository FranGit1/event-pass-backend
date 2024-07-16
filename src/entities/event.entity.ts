import { Entity, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base/base.entity';
import { Location } from './location.entity';
import { Topic } from './topic.entity';
import {AutoMap} from "@automapper/classes";
import {Organization} from "./organization.entity";


@Entity()
export class Event extends BaseEntity {
  @AutoMap()
  @ManyToOne(() => Organization, organization => organization.events)
  organization: Organization;

  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @OneToOne(() => Location, location => location.event)
  @JoinColumn()
  location: Location;

  @AutoMap()
  @Column()
  price: string;

  @AutoMap()
  @ManyToOne(() => Topic, topic => topic.events)
  topic: Topic;

  @AutoMap()
  @Column()
  startDate: Date;

  @AutoMap()
  @Column()
  endDate: Date;

  @AutoMap()
  @Column()
  keywords: string;

  @AutoMap()
  @Column()
  featuredImage: string;

  @AutoMap()
  @Column()
  displayInSlider: boolean;

  @AutoMap()
  @Column()
  sliderPosition: number;
}
