import { AutoMap } from "@automapper/classes";
import { IsBoolean, IsString } from "class-validator";
import { Role } from "src/shared/enums/Role";

export class OrganizerReqDto {
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

  @IsString()
  @AutoMap()
  companyName: string;

  @IsString()
  @AutoMap()
  contactInformation: string;

  @AutoMap()
  role: Role;
}
