import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, DeleteResult, UpdateResult} from "typeorm";
import {CreatableEvent, EditableEvent} from "./event.type";
import {BaseRepository} from "src/shared/base/base.repository";
import {Event} from "src/entities/event.entity";

@Injectable()
export class EventRepository extends BaseRepository<
    Event,
    CreatableEvent,
    EditableEvent
> {
    constructor(
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>
    ) {
        super(eventRepository);
    }

    async findEventById(id: number): Promise<Event | null> {
        return this.eventRepository.findOne({where: {id: id}});
    }

    async findEventsByOrganization(organizationId: number): Promise<Event[] | null> {
        return this.eventRepository.find({where: {organization: {id: organizationId}},relations : {location: true}});
    }

    async createEvent(createEventDto: CreatableEvent): Promise<Event> {
        return await this.eventRepository.save(createEventDto);
    }

    async findAllEvents(): Promise<Event[]> {
        return this.eventRepository.find();
    }

    async updateEvent(id: number, updateEventDto: EditableEvent): Promise<Event> {
        await this.eventRepository.update(id, updateEventDto);
        return this.findEventById(id);
    }

    async deleteEvent(id: number): Promise<DeleteResult> {
        return this.eventRepository.delete(id);
    }
}
