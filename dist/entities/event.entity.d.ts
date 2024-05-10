import { BaseEntity } from 'src/shared/base/base.entity';
import { Location } from './location.entity';
import { Topic } from './topic.entity';
export declare class Event extends BaseEntity {
    organizer: string;
    title: string;
    description: string;
    location: Location;
    price: string;
    topic: Topic;
    startdate: Date;
    enddate: Date;
    keywords: string;
    featuredimage: string;
    displayinslider: boolean;
    sliderposition: number;
}
