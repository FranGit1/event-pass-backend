// update-organization.req.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateOrganizationDto } from "./create-organization.req.dto";

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  keyword?: string;

  @ApiProperty()
  @IsString()
  organizer?: string;

  @ApiProperty()
  @IsString()
  legalname?: string;

  @ApiProperty()
  @IsString()
  slug?: string;

  @ApiProperty()
  @IsString()
  organizerlogo?: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerdescription?: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerfacebook?: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerlink?: string;

  @ApiProperty({ required: false })
  @IsString()
  organizeremail?: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerinstagram?: string;
}
