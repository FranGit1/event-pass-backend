import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Location } from "src/entities/location.entity";
import { CreateLocationDto } from "./dto/request/create-location.req.dto";
import { UpdateLocationDto } from "./dto/request/update.location.req.dto";
import { CreatableLocation, EditableLocation } from "./location.type";

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}

  findOne(id: number): Promise<Location | null> {
    return this.locationRepository.findOne({ where: { id: id } });
  }

  create(createLocationDto: CreatableLocation): Promise<Location> {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  async update(
    id: number,
    updateLocationDto: EditableLocation
  ): Promise<Location> {
    await this.locationRepository.update(id, updateLocationDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.locationRepository.delete(id);
  }
}
