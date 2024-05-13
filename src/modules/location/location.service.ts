import { Injectable } from "@nestjs/common";
import { LocationRepository } from "./location.repository";
import { Location } from "src/entities/location.entity";
import { CreateLocationDto } from "./dto/request/create-location.req.dto";
import { UpdateLocationDto } from "./dto/request/update.location.req.dto";
import { CreatableLocation } from "./location.type";

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  findOne(id: number): Promise<Location | null> {
    return this.locationRepository.findOne(id);
  }

  create(createLocationDto: CreatableLocation): Promise<Location> {
    return this.locationRepository.create(createLocationDto);
  }

  update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    return this.locationRepository.update(id, updateLocationDto);
  }

  remove(id: number): Promise<void> {
    return this.locationRepository.remove(id);
  }
}
