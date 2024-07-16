import { ApiProperty } from "@nestjs/swagger";

import {AutoMap} from "@automapper/classes";

export class EventsResDtoLocation {
  @ApiProperty()
  @AutoMap()
  city: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  country: string;

  @ApiProperty()
  @AutoMap()
  longitude: string;

  @ApiProperty()
  @AutoMap()
  latitude: string;
}


export class EventResDto {

  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()

  @AutoMap()
  organizer: string;

  @ApiProperty()

  @AutoMap()
  title: string;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty({ type: [EventsResDtoLocation] })
  @AutoMap(() => [EventsResDtoLocation])
  location: EventsResDtoLocation;

  @ApiProperty()
  @AutoMap()
  price: number;

  @ApiProperty()
  @AutoMap()
  topic: string;

  @ApiProperty()

  @AutoMap()
  startDate: Date;

  @ApiProperty()

  @AutoMap()
  endDate: Date;

  @ApiProperty()
  @AutoMap()
  keywords: string;

  @ApiProperty()
  @AutoMap()
  featuredImage: string;

  @ApiProperty()
  @AutoMap()
  displayInSlider: boolean;

  @ApiProperty()
  @AutoMap()
  sliderPosition: number;
}
