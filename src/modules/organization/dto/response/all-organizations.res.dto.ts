import { ApiProperty } from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";

export class AllOrganizationsResDto {
    @ApiProperty()
    @AutoMap()
    title: string;

    @ApiProperty()
    @AutoMap()
    id: number;


}
