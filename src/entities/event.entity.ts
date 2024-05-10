import { Entity, Column, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base/base.entity';
import { Location } from './location.entity';
import { Topic } from './topic.entity';


@Entity()
export class Event extends BaseEntity {
  @Column()
  organizer: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Location, location => location.event)
  @JoinColumn()
  location: Location;

  @Column()
  price: string;

  @ManyToOne(() => Topic, topic => topic.events)
  topic: Topic;

  @Column()
  startdate: Date;

  @Column()
  enddate: Date;

  @Column()
  keywords: string;

  @Column()
  featuredimage: string;

  @Column()
  displayinslider: boolean;

  @Column()
  sliderposition: number;
}
