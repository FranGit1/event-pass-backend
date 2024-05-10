import { BaseEntity } from 'src/shared/base/base.entity';
import { Organization } from './organization.entity';
export declare class Organizer extends BaseEntity {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    contactInformation: string;
    organizations: Organization[];
}
