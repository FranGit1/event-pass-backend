import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class EntityIdParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  id: number;
}
