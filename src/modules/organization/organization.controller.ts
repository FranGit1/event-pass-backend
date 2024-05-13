import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
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

@ApiTags("Organizations")
@Controller("organizations")
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
