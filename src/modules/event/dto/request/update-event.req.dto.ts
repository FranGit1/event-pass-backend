import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsDate,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class UpdateEventDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  organizer?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  locationId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  topicId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  startdate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  enddate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keywords?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  featuredimage?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  displayinslider?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  sliderposition?: number;
}
