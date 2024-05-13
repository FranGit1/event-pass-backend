// create-organization.req.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keyword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  legalname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizerlogo: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerdescription: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerfacebook: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerlink: string;

  @ApiProperty({ required: false })
  @IsString()
  organizeremail: string;

  @ApiProperty({ required: false })
  @IsString()
  organizerinstagram: string;
}
