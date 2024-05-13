import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsBoolean,
} from "class-validator";

export class EventResDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organizer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startdate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  enddate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  featuredimage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  displayinslider: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sliderposition: number;
}
