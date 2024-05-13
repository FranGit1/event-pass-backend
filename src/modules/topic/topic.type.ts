import { Topic } from "src/entities/topic.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableTopic = OmitBaseEntity<Topic>;

export type EditableTopic = Partial<CreatableTopic>;
