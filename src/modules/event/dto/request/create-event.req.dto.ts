import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from "class-validator";
import {AutoMap} from "@automapper/classes";

export class CreateLocationReqDto {
  @AutoMap()
  city: string;
  @AutoMap()
  country: string;
  @AutoMap()
  name: string;
  @AutoMap()
  latitude: string;
  @AutoMap()
  longitude: string;
}


export class CreateEventDto {

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @AutoMap()
  location: CreateLocationReqDto;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  price: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  topicId: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @AutoMap()
  startDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @AutoMap()
  endDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  keywords: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @AutoMap()
  featuredImage: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  @AutoMap()
  displayInSlider: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @AutoMap()
  sliderPosition: number;
}

