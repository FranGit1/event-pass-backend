import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';
export declare class Topic extends BaseEntity {
    name: string;
    description: string;
    events: Event[];
}
