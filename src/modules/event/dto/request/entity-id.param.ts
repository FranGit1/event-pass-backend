import { ApiProperty } from "@nestjs/swagger";
import {IsInt, IsNotEmpty, IsNumber} from "class-validator";

export class EntityIdParam {
  @ApiProperty()
  @IsNumber()
  @IsInt()
  id: number;
}
