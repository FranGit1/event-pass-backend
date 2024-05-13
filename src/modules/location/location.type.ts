import { Location } from "src/entities/location.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableLocation = OmitBaseEntity<Location>;

export type EditableLocation = Partial<CreatableLocation>;
