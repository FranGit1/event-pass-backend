import { Buyer } from "src/entities/buyer.entity";
import { OmitBaseEntity } from "src/shared/base/base.types";

export type CreatableBuyer = OmitBaseEntity<Buyer>;

export type EditableBuyer = Partial<CreatableBuyer>;
