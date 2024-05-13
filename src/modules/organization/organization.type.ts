import { Organization } from "src/entities/organization.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableOrganization = OmitBaseEntity<Organization>;

export type EditableOrganization = Partial<CreatableOrganization>;
