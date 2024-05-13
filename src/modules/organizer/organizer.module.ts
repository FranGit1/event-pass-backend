import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Organizer } from "src/entities/organizer.entity";
import { OrganizerController } from "./organizer.controller";
import { OrganizerRepository } from "./organizer.repository";
import { OrganizerService } from "./organizer.service";

@Module({
  imports: [TypeOrmModule.forFeature([Organizer]), AutoMapperModule],
  providers: [OrganizerRepository, OrganizerService],
  controllers: [OrganizerController],
  exports: [OrganizerService],
})
export class OrganizerModule {}
