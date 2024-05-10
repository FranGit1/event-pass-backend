import { Event } from './event.entity';
import { BaseEntity } from 'src/shared/base/base.entity';
export declare class Location extends BaseEntity {
    city: string;
    country: string;
    name: string;
    latitude: string;
    longitude: string;
    event: Event;
}
