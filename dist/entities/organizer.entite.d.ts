import { BaseEntity } from 'typeorm';
export declare class Organizer extends BaseEntity {
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
}
