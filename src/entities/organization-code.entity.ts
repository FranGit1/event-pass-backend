import {BaseEntity} from "../shared/base/base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {Organization} from "./organization.entity";

@Entity()
export class OrganizationCode  extends BaseEntity{
    @Column()
    code: string;

    @Column({ default: false })
    used: boolean;

    @ManyToOne(() => Organization, organization => organization.codes)
    organization: Organization;
}
