import { BaseEntity } from 'src/shared/base/base.entity';
import { Organizer } from './organizer.entity';
export declare class Organization extends BaseEntity {
    title: string;
    keyword: string;
    organizer: string;
    legalname: string;
    slug: string;
    organizerlogo: string;
    organizerdescription: string;
    organizerfacebook: string;
    organizerlink: string;
    organizeremail: string;
    organizerinstagram: string;
    organizers: Organizer[];
}
