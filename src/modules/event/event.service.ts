import {Injectable, NotFoundException} from "@nestjs/common";
import {Event} from "src/entities/event.entity";
import {UpdateEventDto, UpdateLocationReqDto} from "./dto/request/update-event.req.dto";
import {DeleteResult} from "typeorm";
import {EventRepository} from "./event.repository";
import {LocationService} from "../location/location.service";
import {CreateEventDto, CreateLocationReqDto} from "./dto/request/create-event.req.dto";
import {InjectMapper} from "@timonmasberg/automapper-nestjs";
import {Mapper} from "@automapper/core";
import {Location} from "../../entities/location.entity";
import {TopicService} from "../topic/topic.service";
import {OrganizationService} from "../organization/organization.service";
import {FirebaseStorageService} from "../firebase/firebase-storage.service";
import {BuyerService} from "../buyer/buyer.service";

@Injectable()
export class EventService {
    constructor(
        private readonly eventRepository: EventRepository,
        private readonly locationService: LocationService,
        private readonly topicService: TopicService,
        private readonly organizationService: OrganizationService,
        private readonly buyerService: BuyerService,
        private firebaseStorageService: FirebaseStorageService,
    @InjectMapper() private readonly autoMapper: Mapper
    ) {
    }

    async findEventById(id: number): Promise<Event | null> {
        return this.eventRepository.findEventById(id);
    }

    async findEventsByOrganization(organizationId: number): Promise<Event[] | null> {
        return this.eventRepository.findEventsByOrganization(organizationId);
    }

    async findAllLiveEvents(): Promise<Event[] | null> {
        return this.eventRepository.findAllLiveEvents();
    }

    async addFavorite(buyerId: number, eventId: number): Promise<void> {
        const buyer = await this.buyerService.findOneWithFav(buyerId);
        const event = await this.eventRepository.findEventById(eventId);

        if (buyer && event) {
            buyer.favoriteEvents = [...buyer.favoriteEvents, event];
            await this.buyerService.save(buyer);
        }
    }

    async removeFavorite(buyerId: number, eventId: number): Promise<void> {
        const buyer = await this.buyerService.findOneWithFav(buyerId);
        const event = await this.eventRepository.findEventById(eventId);

        if (buyer && event) {
            buyer.favoriteEvents = buyer.favoriteEvents.filter(
                (favEvent) => (favEvent.id !== event.id
            ));
            await this.buyerService.save(buyer);
        }
    }

    async createEvent(createEventDto: CreateEventDto, organizationId: number): Promise<Event> {
        if(createEventDto.displayInSlider==null){
            createEventDto.displayInSlider=false;
        }
        const newEvent = this.autoMapper.map(createEventDto, CreateEventDto, Event);
        const eventLocation = this.autoMapper.map(createEventDto.location, CreateLocationReqDto, Location);
        const location = await this.locationService.create(eventLocation);
        newEvent.location = location;
        newEvent.topic = await this.topicService.findOne(createEventDto.topicId);
        newEvent.organization = await this.organizationService.findOne(organizationId);
        const savedEvent = await this.eventRepository.createEvent(newEvent);
        location.event = savedEvent;
        await this.locationService.update(location.id, location);
        return savedEvent;
    }

    async findAllEvents(): Promise<Event[]> {
        return this.eventRepository.findAllEvents();
    }

    async updateEvent(
        id: number,
        updateEventDto: UpdateEventDto
    ): Promise<Event> {
        const event = await this.eventRepository.findEventById(id);
        const { location,topicId, ...eventUpdates } = updateEventDto;

        let updatedLocation;
        if(location?.id){
            updatedLocation = await this.locationService.update(location.id,location);

        }else{
            await this.eventRepository.updateEvent(id, { ...eventUpdates, location: null });

            await this.locationService.remove(event.location.id);

            const eventLocation = this.autoMapper.map(location, UpdateLocationReqDto, Location);
            updatedLocation = await this.locationService.create(eventLocation);
        }
        return await this.eventRepository.updateEvent(id, {
                ...eventUpdates, location: updatedLocation
            }
        );

    }


    async deleteEvent(id: number): Promise<void> {
        const event = await this.eventRepository.findEventById(id);

        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found.`);
        }
        if (event.featuredImage) {
            await this.firebaseStorageService.deleteFile(event.featuredImage);
        }
        if (event.location) {
            await this.eventRepository.updateEvent(id, { location: null });
            await this.locationService.remove(event.location.id);
        }
        await this.eventRepository.deleteEvent(id);
    }
}
