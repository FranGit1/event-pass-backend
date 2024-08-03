import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsString } from "class-validator";
import { Role } from "src/shared/enums/Role";
import {Event} from "../../../../entities/event.entity";

export class BuyerReqDto {
    @IsString()
    @AutoMap()
    email: string;

    @IsString()
    @AutoMap()
    firstName: string;

    @IsString()
    @AutoMap()
    lastName: string;

    @IsString()
    @AutoMap()
    password: string;

    @IsString()
    @AutoMap()
    username: string;

    @AutoMap()
    favoriteEvents: Event[];


    @AutoMap()
    role: Role;
}
