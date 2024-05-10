import { BaseEntity } from 'src/shared/base/base.entity';
import { Entity, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class Organizer extends BaseEntity{
  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  companyName: string;

  @Column()
  contactInformation: string;

  @ManyToMany(() => Organization, organization => organization.organizers)
  @JoinTable()
  organizations: Organization[];
}
