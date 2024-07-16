import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";

export class GetOrganizationByOrganizerResDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    title: string;

    @ApiProperty()
    @AutoMap()
    organizer: string;

    @ApiProperty()
    @AutoMap()
    slug: string;

    @ApiProperty()
    @AutoMap()
    organizerDescription: string;

    @ApiProperty()
    @AutoMap()
    organizerFacebook: string;

    @ApiProperty()
    @AutoMap()
    legalName: string;

    @ApiProperty()
    @AutoMap()
    organizerLogo: string;

    @ApiProperty()
    @AutoMap()
    organizerEmail: string;

    @ApiProperty()
    @AutoMap()
    organizerLink: string;

    @ApiProperty()
    @AutoMap()
    organizerInstagram: string;


    @ApiProperty()
    @AutoMap()
    liveEventsCount: number;

}
