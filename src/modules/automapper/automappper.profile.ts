import { Mapper, MappingProfile, createMap } from "@automapper/core";
import {
    AutomapperProfile,
    InjectMapper,
} from "@timonmasberg/automapper-nestjs";
import {Organization} from "../../entities/organization.entity";
import {GetOrganizationByOrganizerResDto} from "../organizer/dto/response/get-organization-by-organizer.res.dto";
import {CreateEventDto, CreateLocationReqDto} from "../event/dto/request/create-event.req.dto";
import {Event} from "../../entities/event.entity";
import {Location} from "../../entities/location.entity";
import {
    EventResDto,
    EventsResDtoLocation,
    EventsResDtoOrganization,
    EventsResDtoTopic
} from "../event/dto/response/event.res.dto";
import {OrganizerReqDto} from "../auth/dto/request/organizer.req.dto";
import {Organizer} from "../../entities/organizer.entity";
import {AllOrganizationsResDto} from "../organization/dto/response/all-organizations.res.dto";
import {Topic} from "../../entities/topic.entity";
import {UpdateLocationReqDto} from "../event/dto/request/update-event.req.dto";

export class AutomapperProfileTypes extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Organization, GetOrganizationByOrganizerResDto);
            createMap(mapper, GetOrganizationByOrganizerResDto, Organization);
            createMap(mapper, CreateEventDto, Event);
            createMap(mapper, CreateLocationReqDto, Location);
            createMap(mapper, Event, EventResDto)
            createMap(mapper, Location, EventsResDtoLocation);
            createMap(mapper, OrganizerReqDto, Organizer);
            createMap(mapper, Organization, AllOrganizationsResDto);
            createMap(mapper, Topic, EventsResDtoTopic);
            createMap(mapper, UpdateLocationReqDto, Location);
            createMap(mapper, Organization, EventsResDtoOrganization);


        };
    }
}
