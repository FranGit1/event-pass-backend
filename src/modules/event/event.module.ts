import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { EventRepository } from "./event.repository";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { Event } from "src/entities/event.entity";
import {LocationModule} from "../location/location.module";
import {TopicModule} from "../topic/topic.module";
import {OrganizationModule} from "../organization/organization.module";
import {FirebaseModule} from "../firebase/firebase.module";
import {BuyerModule} from "../buyer/buyer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AutoMapperModule,LocationModule,TopicModule, OrganizationModule,FirebaseModule,BuyerModule],
  providers: [EventRepository, EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
