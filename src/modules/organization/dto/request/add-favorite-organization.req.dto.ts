import {IsNumber} from "class-validator";
import {AutoMap} from "@automapper/classes";

export class AddFavoriteOrganizationReqDto {
    @IsNumber()
    @AutoMap()
    organizationId: number;
}
