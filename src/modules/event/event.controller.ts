import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    HttpStatus,
    ConflictException, UseInterceptors,
} from "@nestjs/common";
import {ApiTags, ApiOperation, ApiBearerAuth} from "@nestjs/swagger";
import {Event} from "src/entities/event.entity";

import {EventResDto} from "./dto/response/event.res.dto";
import {
    CREATE_EVENT_DOCUMENTATION,
    DELETE_EVENT_BY_ID_DOCUMENTATION,
    GET_ALL_EVENTS_DOCUMENTATION,
    GET_EVENT_BY_ID_DOCUMENTATION,
    UPDATE_EVENT_BY_ID_DOCUMENTATION,
} from "./event.documentation";
import {createHttpResponse} from "src/shared/http/create-http-response";
import {HttpResponse} from "src/shared/http/http-response";
import {CreateEventDto} from "./dto/request/create-event.req.dto";
import {UpdateEventDto} from "./dto/request/update-event.req.dto";
import {EntityIdParam} from "./dto/request/entity-id.param";
import {PublicRouteResponseDto} from "./dto/response/public-route.res.dto";
import {EventService} from "./event.service";
import {InjectMapper} from "@timonmasberg/automapper-nestjs";
import {Mapper} from "@automapper/core";
import {LoggerInterceptor} from "../../shared/interceptors/logger.interceptor";
import {OrganizationService} from "../organization/organization.service";
import {Organization} from "../../entities/organization.entity";
import {GetOrganizationByOrganizerResDto} from "../organizer/dto/response/get-organization-by-organizer.res.dto";

@ApiTags("Event")
@Controller("events")
@UseInterceptors(LoggerInterceptor)
export class EventController {
    constructor(
        private readonly eventService: EventService,
        @InjectMapper() private readonly autoMapper: Mapper,
        private readonly organizationService: OrganizationService,
    ) {
    }

    @ApiOperation(GET_ALL_EVENTS_DOCUMENTATION)
    @Get()
    async findAllEvents(): Promise<HttpResponse<EventResDto[]>> {
        const events = await this.eventService.findAllEvents();
        const payload = this.autoMapper.mapArray(events, Event, EventResDto);

        return createHttpResponse(
            HttpStatus.OK,
            "All events retrieved successfully.",
            payload
        );
    }

    @ApiOperation(GET_EVENT_BY_ID_DOCUMENTATION)
    @ApiBearerAuth()
    @Get(":id")
    async findEventById(
        @Param("id") id: number
    ): Promise<HttpResponse<EventResDto>> {
        const event = await this.eventService.findEventById(id);
        if (!event) {
            throw new ConflictException("Event not found.");
        }
        const payload = this.autoMapper.map(event, Event, EventResDto);

        return createHttpResponse(
            HttpStatus.OK,
            "Event retrieved successfully.",
            payload
        );
    }

    @ApiOperation(GET_EVENT_BY_ID_DOCUMENTATION)
    @ApiBearerAuth()
    @Get("/events-by-organization/:id")
    async findEventsByOrganization(
        @Param("id") id: number
    ) {
        const events = await this.eventService.findEventsByOrganization(id);
        const organization = await this.organizationService.findOne(id);

        if (!events) {
            throw new ConflictException("Event not found.");
        }
        const payload = {
            events: this.autoMapper.mapArray(events, Event, EventResDto),
            organization: this.autoMapper.map(organization, Organization, GetOrganizationByOrganizerResDto)
        }
        return createHttpResponse(
            HttpStatus.OK,
            "Event retrieved successfully.",
            payload
        );
    }

    @ApiOperation(CREATE_EVENT_DOCUMENTATION)
    // @ApiBearerAuth()
    @Post(":id")
    async createEvent(@Param("id") id: number,
                      @Body() createEventDto: CreateEventDto
    ): Promise<HttpResponse<Event>> {
        await this.eventService.createEvent(createEventDto, id);
        const payload = null;
        return createHttpResponse(
            HttpStatus.CREATED,
            "Event created successfully.",
            payload
        );
    }

    @ApiOperation(UPDATE_EVENT_BY_ID_DOCUMENTATION)
    @ApiBearerAuth()
    @Put(":id")
    async updateEvent(
        @Param("id") id: number,
        @Body() updateEventDto: UpdateEventDto
    ): Promise<HttpResponse<EventResDto>> {
        const updatedEvent = await this.eventService.updateEvent(
            id,
            updateEventDto
        );
        const payload = this.autoMapper.map(updatedEvent, Event, EventResDto);

        return createHttpResponse(
            HttpStatus.OK,
            "Event updated successfully.",
            payload
        );
    }

    @ApiOperation(DELETE_EVENT_BY_ID_DOCUMENTATION)
    @ApiBearerAuth()
    @Delete(":id")
    async deleteEvent(
        @Param() params: EntityIdParam
    ): Promise<HttpResponse<PublicRouteResponseDto>> {
        const {id} = params;
        await this.eventService.deleteEvent(id);
        return createHttpResponse(HttpStatus.OK, "Event deleted successfully.");
    }
}
