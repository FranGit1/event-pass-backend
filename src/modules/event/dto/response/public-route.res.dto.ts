import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import {AutoMap} from "@automapper/classes";

export class PublicRouteResponseDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  message: string;
}
