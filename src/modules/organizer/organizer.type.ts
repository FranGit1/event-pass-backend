import { Organizer } from "src/entities/organizer.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableOrganizer = OmitBaseEntity<Organizer>;

export type EditableOrganizer = Partial<CreatableOrganizer>;
