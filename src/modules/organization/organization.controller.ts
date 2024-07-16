import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, HttpStatus, UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import {
  CREATE_ORGANIZATION_DOCUMENTATION,
  DELETE_ORGANIZATION_BY_ID_DOCUMENTATION,
  GET_ORGANIZATION_BY_ID_DOCUMENTATION,
  UPDATE_ORGANIZATION_DOCUMENTATION,
} from "./organization.documentation";
import { Organization } from "src/entities/organization.entity";

import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";
import { OrganizationService } from "./organization.service";
import { CreateOrganizationDto } from "./dto/request/create-organization.req.dto";
import { UpdateOrganizationDto } from "./dto/request/update-organizatin.req.dto";
import {GET_ORGANIZERS_ORGANIZATIONS} from "../organizer/organizer.documentation";
import {HttpResponse} from "../../shared/http/http-response";
import {GetOrganizationByOrganizerResDto} from "../organizer/dto/response/get-organization-by-organizer.res.dto";
import {createHttpResponse} from "../../shared/http/create-http-response";
import {LoggerInterceptor} from "../../shared/interceptors/logger.interceptor";
import {isBefore} from "date-fns";

@ApiTags("Organizations")
@Controller("organizations")
@UseInterceptors(LoggerInterceptor)
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  @ApiOperation(GET_ORGANIZATION_BY_ID_DOCUMENTATION)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<Organization | null> {
    return this.organizationService.findOne(id);
  }

  @ApiOperation(GET_ORGANIZERS_ORGANIZATIONS)
  @Get("organizations-by-organizer/:id")
  async findOrganizationsByOrganizer(@Param("id") id: number):Promise<HttpResponse<GetOrganizationByOrganizerResDto[]>> {
    const organizations = await this.organizationService.findOrganizationsByOrganizerId(id);

    let payload = this.autoMapper.mapArray(organizations,Organization,GetOrganizationByOrganizerResDto);
    payload = payload.map((org, index) => {
      const now = new Date();
      const liveEventsCount = organizations[index].events.filter(event => !isBefore((event.endDate), now)).length;
      return { ...org, liveEventsCount };
    });
    return createHttpResponse(
        HttpStatus.OK,
        "Organizations retrieved successfully.",
        payload
    );
  }
  @ApiOperation(CREATE_ORGANIZATION_DOCUMENTATION)
  @Post()
  create(
    @Body() createOrganizationDto: CreateOrganizationDto
  ): Promise<Organization> {
    const organization = this.autoMapper.map(
      createOrganizationDto,
      CreateOrganizationDto,
      Organization
    );
    return this.organizationService.create(organization);
  }

  @ApiOperation(UPDATE_ORGANIZATION_DOCUMENTATION)
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ): Promise<Organization> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @ApiOperation(DELETE_ORGANIZATION_BY_ID_DOCUMENTATION)
  @ApiBearerAuth()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.organizationService.remove(id);
  }
}
