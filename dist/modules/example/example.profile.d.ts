import { AutomapperProfile } from '@timonmasberg/automapper-nestjs';
import { Mapper, MappingProfile } from '@automapper/core';
export declare class ExampleProfile extends AutomapperProfile {
    constructor(mapper: Mapper);
    get profile(): MappingProfile;
}
