import { BaseEntity } from 'src/shared/base/base.entity';
import { Entity, Column, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { Organization } from './organization.entity';
import {AutoMap} from "@automapper/classes";
import {UserLogsEntity} from "./userLogs.entity";
import {EnumColumn} from "../shared/typeorm/columns";
import {Role} from "../shared/enums/Role";

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
  @EnumColumn({ enum: Role, nullable: true, default: Role.organizer })
  role: Role;

  @AutoMap()
  @ManyToMany(() => Organization, organization => organization.organizers, { cascade: true })
  @JoinTable()
  organizations: Organization[];

  @AutoMap(() => [UserLogsEntity])
  @OneToMany(() => UserLogsEntity, (userLogs) => userLogs.organizer, {
    cascade: ["insert"],
  })
  organizerLogs?: UserLogsEntity[];

  @ManyToMany(() => Organization, { cascade: true })
  @JoinTable()
  favoriteOrganizations: Organization[];
}
