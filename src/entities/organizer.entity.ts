import { BaseEntity } from 'src/shared/base/base.entity';
import { Entity, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Organization } from './organization.entity';
import {AutoMap} from "@automapper/classes";

@Entity()
export class Organizer extends BaseEntity{
  @AutoMap()
  @Column()
  username: string;

  @AutoMap()
  @Column()
  firstName: string;

  @AutoMap()
  @Column()
  lastName: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column()
  companyName: string;

  @AutoMap()
  @Column()
  contactInformation: string;

  @AutoMap()
  @ManyToMany(() => Organization, organization => organization.organizers)
  @JoinTable()
  organizations: Organization[];
}
