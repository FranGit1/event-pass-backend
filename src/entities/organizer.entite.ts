import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Organizer extends BaseEntity {
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
}

