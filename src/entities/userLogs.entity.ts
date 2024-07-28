import { AutoMap } from "@automapper/classes";
import { EnumColumn, JSONColumn } from "src/shared/typeorm/columns";
import { Entity, ManyToOne } from "typeorm";
import { Buyer } from "./buyer.entity";
import { BaseEntity } from "src/shared/base/base.entity";
import {Organizer} from "./organizer.entity";
import {UserLogsEvent} from "../shared/enums/UserLogsEvent";

@Entity()
export class UserLogsEntity extends BaseEntity {
    @AutoMap(() => String)
    @EnumColumn({ enum: UserLogsEvent, nullable: false })
    event: UserLogsEvent;

    @AutoMap()
    @JSONColumn({ nullable: true })
    payload?: JSON;

    @AutoMap(() => Buyer)
    @ManyToOne(() => Buyer, (buyer) => buyer.buyerLogs, {
        nullable: true,
        cascade: ["soft-remove"],
    })
    buyer?: Buyer;

    @AutoMap(() => Organizer)
    @ManyToOne(() => Organizer, (organizer) => organizer.organizerLogs, {
        nullable: true,
        cascade: ["soft-remove"],
    })
    organizer?: Organizer;
}
