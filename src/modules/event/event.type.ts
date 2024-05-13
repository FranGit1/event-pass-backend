import { Event } from "src/entities/event.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableEvent = OmitBaseEntity<Event>;

export type EditableEvent = Partial<CreatableEvent>;
