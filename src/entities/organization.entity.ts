import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base/base.entity';
import { Organizer } from './organizer.entity';

@Entity()
export class Organization extends BaseEntity {
  @Column()
  title: string;

  @Column()
  keyword: string;

  @Column()
  organizer: string;

  @Column()
  legalname: string;

  @Column()
  slug: string;

  @Column()
  organizerlogo: string;

  @Column({ nullable: true })
  organizerdescription: string;

  @Column({ nullable: true })
  organizerfacebook: string;

  @Column({ nullable: true })
  organizerlink: string;

  @Column({ nullable: true })
  organizeremail: string;

  @Column({ nullable: true })
  organizerinstagram: string;

  @ManyToMany(() => Organizer, organizer => organizer.organizations)
  organizers: Organizer[];
}

