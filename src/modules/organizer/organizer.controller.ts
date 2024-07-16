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
  CREATE_ORGANIZER_DOCUMENTATION,
  DELETE_ORGANIZER_BY_ID_DOCUMENTATION,
  GET_ORGANIZER_BY_ID_DOCUMENTATION, GET_ORGANIZERS_ORGANIZATIONS,
  UPDATE_ORGANIZER_DOCUMENTATION,
} from "./organizer.documentation";
import { Organizer } from "src/entities/organizer.entity";
import { CreateOrganizerDto } from "./dto/request/create-organizer.req.dto";
import { UpdateOrganizerDto } from "./dto/request/update-organizer.req.dto";
import { OrganizerService } from "./organizer.service";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";
import {Organization} from "../../entities/organization.entity";
import {GetOrganizationByOrganizerResDto} from "./dto/response/get-organization-by-organizer.res.dto";
import {HttpResponse} from "../../shared/http/http-response";
import {createHttpResponse} from "../../shared/http/create-http-response";
import {LoggerInterceptor} from "../../shared/interceptors/logger.interceptor";

@ApiTags("Organizers")
@Controller("organizers")
@UseInterceptors(LoggerInterceptor)
export class OrganizerController {
  constructor(
    private readonly organizerService: OrganizerService,
    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  @ApiOperation(GET_ORGANIZER_BY_ID_DOCUMENTATION)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<Organizer | null> {
    return this.organizerService.findOne(id);
  }



  @ApiOperation(CREATE_ORGANIZER_DOCUMENTATION)
  @Post()
  create(@Body() createOrganizerDto: CreateOrganizerDto): Promise<Organizer> {
    const organizer = this.autoMapper.map(
      createOrganizerDto,
      CreateOrganizerDto,
      Organizer
    );
    return this.organizerService.create(organizer);
  }

  @ApiOperation(UPDATE_ORGANIZER_DOCUMENTATION)
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateOrganizerDto: UpdateOrganizerDto
  ): Promise<Organizer> {
    return this.organizerService.update(id, updateOrganizerDto);
  }

  @ApiOperation(DELETE_ORGANIZER_BY_ID_DOCUMENTATION)
  @ApiBearerAuth()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.organizerService.remove(id);
  }
}
