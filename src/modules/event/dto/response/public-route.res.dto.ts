import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PublicRouteResponseDto {
  @ApiProperty()
  @IsString()
  message: string;
}
