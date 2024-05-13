import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Location } from "src/entities/location.entity";
import { LocationRepository } from "./location.repository";
import { LocationService } from "./location.service";
import { LocationController } from "./location.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Location]), AutoMapperModule],
  providers: [LocationRepository, LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
