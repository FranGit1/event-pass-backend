import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import {Column} from "typeorm";

export class OrganizationDetailsDtoResDto {
    @ApiProperty()
    @AutoMap()
    title: string;

    @AutoMap()
    @ApiProperty()
    organizerLogo: string;

    @AutoMap()
    @ApiProperty()
    organizerDescription: string;

    @AutoMap()
    @ApiProperty()
    organizerFacebook: string;

    @AutoMap()
    @ApiProperty()
    organizerLink: string;

    @AutoMap()
    @ApiProperty()
    organizerEmail: string;

    @AutoMap()
    @ApiProperty()
    organizerInstagram: string;

}
