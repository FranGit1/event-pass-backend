import {IsNumber, IsOptional} from "class-validator";
import {AutoMap} from "@automapper/classes";

export class AddFavoriteOrganizationReqDto {
    @IsNumber()
    @IsOptional()
    @AutoMap()
    organizationId: number;
}
