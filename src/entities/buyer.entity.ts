// buyer.entity.ts
import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "src/shared/base/base.entity";
import { Role } from "src/shared/enums/Role";
import { EnumColumn } from "src/shared/typeorm/columns";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Buyer extends BaseEntity {
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

  @AutoMap()
  @EnumColumn({ enum: Role, nullable: true, default: Role.buyer })
  role: Role;
}
