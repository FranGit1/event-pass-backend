import { Injectable } from "@nestjs/common";
import { Event } from "src/entities/event.entity";
import { UpdateEventDto } from "./dto/request/update-event.req.dto";
import { DeleteResult } from "typeorm";
import { EventRepository } from "./event.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { LocationService } from "../location/location.service";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,
    private readonly locationService: LocationService
  ) {}

  async findEventById(id: number): Promise<Event | null> {
    return this.eventRepository.findEventById(id);
  }

  async createEvent(createEventDto: Event): Promise<Event> {
    return this.eventRepository.createEvent(createEventDto);
  }

  async findAllEvents(): Promise<Event[]> {
    return this.eventRepository.findAllEvents();
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto
  ): Promise<Event> {
    const location = await this.locationService.findOne(
      updateEventDto.locationId
    );
    return this.eventRepository.updateEvent(id, {
      ...updateEventDto,
      location: location,
    });
  }

  async deleteEvent(id: number): Promise<DeleteResult> {
    return this.eventRepository.deleteEvent(id);
  }
}
