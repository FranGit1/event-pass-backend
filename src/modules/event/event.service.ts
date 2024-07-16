import {Injectable} from "@nestjs/common";
import {Event} from "src/entities/event.entity";
import {UpdateEventDto} from "./dto/request/update-event.req.dto";
import {DeleteResult} from "typeorm";
import {EventRepository} from "./event.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {LocationService} from "../location/location.service";
import {CreateEventDto, CreateLocationReqDto} from "./dto/request/create-event.req.dto";
import {InjectMapper} from "@timonmasberg/automapper-nestjs";
import {Mapper} from "@automapper/core";
import {Location} from "../../entities/location.entity";
import {TopicService} from "../topic/topic.service";
import {OrganizationService} from "../organization/organization.service";

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly locationService: LocationService,
    private readonly topicService: TopicService,
    private readonly organizationService: OrganizationService,
    @InjectMapper() private readonly autoMapper: Mapper

  ) {}

  async findEventById(id: number): Promise<Event | null> {
    return this.eventRepository.findEventById(id);
  }

  async findEventsByOrganization(organizationId: number): Promise<Event[] | null> {
    return this.eventRepository.findEventsByOrganization(organizationId);
  }

  async createEvent(createEventDto: CreateEventDto, organizationId: number): Promise<Event> {
    const newEvent = this.autoMapper.map(createEventDto, CreateEventDto, Event);
    const eventLocation = this.autoMapper.map(createEventDto.location,CreateLocationReqDto,Location);
    const location = await this.locationService.create(eventLocation);
    newEvent.location = location;
    newEvent.topic = await this.topicService.findOne(createEventDto.topicId);
    newEvent.organization= await this.organizationService.findOne(organizationId);
    const savedEvent =  await this.eventRepository.createEvent(newEvent);
    location.event = savedEvent;
    await this.locationService.update(location.id,location);
    return savedEvent;
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
