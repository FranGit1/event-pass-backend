import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from "class-validator";

export class CreateEventDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  organizer: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  topic: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  startdate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  enddate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  keywords: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  featuredimage: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  displayinslider: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  sliderposition: number;
}
