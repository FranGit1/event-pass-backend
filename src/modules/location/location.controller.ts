import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { LocationService } from "./location.service";
import { CreateLocationDto } from "./dto/request/create-location.req.dto";
import { UpdateLocationDto } from "./dto/request/update.location.req.dto";
import { Location } from "src/entities/location.entity";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";

@Controller("locations")
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Location | null> {
    return this.locationService.findOne(id);
  }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.autoMapper.map(
      createLocationDto,
      CreateLocationDto,
      Location
    );
    return this.locationService.create(location);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateLocationDto: UpdateLocationDto
  ): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.locationService.remove(id);
  }
}
