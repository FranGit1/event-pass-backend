import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { EventRepository } from "./event.repository";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { Event } from "src/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AutoMapperModule],
  providers: [EventRepository, EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
