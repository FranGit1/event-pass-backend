import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
import {
    ADD_FAVORITE_DOCUMENTATION,
    CREATE_ORGANIZATION_DOCUMENTATION,
    DELETE_ORGANIZATION_BY_ID_DOCUMENTATION,
    GET_ALL_ORGANIZATIONS_DOCUMENTATION,
    GET_FAVORITES_ORGANIZATIONS_DOCUMENTATION,
    GET_FAVOURITE_ORGANIZATIONS_BY_ORGANIZER_DOCUMENTATION,
    GET_ORGANIZATION_BY_ID_DOCUMENTATION,
    POST_LEAVE_ORGANIZATION_DOCUMENTATION,
    REMOVE_FAVORITE_DOCUMENTATION,
    UPDATE_ORGANIZATION_DOCUMENTATION,
} from "./organization.documentation";
import {Organization} from "src/entities/organization.entity";

import {Mapper} from "@automapper/core";
import {InjectMapper} from "@timonmasberg/automapper-nestjs";
import {OrganizationService} from "./organization.service";
import {CreateOrganizationDto} from "./dto/request/create-organization.req.dto";
import {UpdateOrganizationDto} from "./dto/request/update-organizatin.req.dto";
import {GET_ORGANIZERS_ORGANIZATIONS} from "../organizer/organizer.documentation";
import {HttpResponse} from "../../shared/http/http-response";
import {GetOrganizationByOrganizerResDto} from "../organizer/dto/response/get-organization-by-organizer.res.dto";
import {createHttpResponse} from "../../shared/http/create-http-response";
import {LoggerInterceptor} from "../../shared/interceptors/logger.interceptor";
import {isBefore} from "date-fns";
import {AuthUserIdParam} from "../../shared/decorators/user.decorator";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {AllOrganizationsResDto} from "./dto/response/all-organizations.res.dto";
import {Event} from "../../entities/event.entity";
import {AddFavoriteOrganizationReqDto} from "./dto/request/add-favorite-organization.req.dto";
import {EntityIdParam} from "../event/dto/request/entity-id.param";
import {PublicRouteResponseDto} from "../event/dto/response/public-route.res.dto";
import {ApiCustomResponse} from "../../shared/decorators/api-response.decorator";
import {OrganizationDetailsDtoResDto} from "./dto/response/organization-details-dto.res.dto";

@ApiTags("Organizations")
@Controller("organizations")
@UseInterceptors(LoggerInterceptor)
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService,
        @InjectMapper() private readonly autoMapper: Mapper
    ) {
    }


    @ApiOperation(GET_ORGANIZERS_ORGANIZATIONS)
    @Get("organizations-by-organizer")
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    async findOrganizationsByOrganizer(@AuthUserIdParam() userId: number
    ): Promise<HttpResponse<GetOrganizationByOrganizerResDto[]>> {
        const organizations = await this.organizationService.findOrganizationsByOrganizerId(userId);

        let payload = this.autoMapper.mapArray(organizations, Organization, GetOrganizationByOrganizerResDto);
        payload = payload.map((org, index) => {
            const now = new Date();
            const liveEventsCount = organizations[index].events.filter(event => !isBefore((event.endDate), now)).length;
            return {...org, liveEventsCount};
        });
        return createHttpResponse(
            HttpStatus.OK,
            "Organizations retrieved successfully.",
            payload
        );
    }

    @Post('generate-code/:id')
    @UseGuards(JwtGuard)
    async generateCode(@Param('id') organizationId: number): Promise<string> {
        return await this.organizationService.generateOrganizationCode(organizationId);
    }

    @Post('join')
    @UseGuards(JwtGuard)
    async joinOrganization(
        @AuthUserIdParam() organizerId: number,
        @Body('code') code: string
    ): Promise<void> {
        await this.organizationService.joinOrganization(organizerId, code);
    }

    @ApiOperation(GET_ORGANIZATION_BY_ID_DOCUMENTATION)
    @Get(":id")
    async findOne(@Param("id") id: number): Promise<HttpResponse<OrganizationDetailsDtoResDto>> {
        const organization = await this.organizationService.findOne(id);
    const payload = this.autoMapper.map(organization,Organization,OrganizationDetailsDtoResDto)
    return createHttpResponse(
        HttpStatus.OK,
    "Organizations fetched successfully.",
    payload
);    }


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


    @ApiOperation(GET_ALL_ORGANIZATIONS_DOCUMENTATION)
    @Get("get/all-organizations")
    async getAllOrganizations(): Promise<HttpResponse<AllOrganizationsResDto[]>> {
        const organizations = await this.organizationService.findAll();
        const payload = this.autoMapper.mapArray(organizations, Organization, AllOrganizationsResDto);

        return createHttpResponse(
            HttpStatus.OK,
            "Organizations fetched successfully.",
            payload
        );
    }


    @ApiOperation(POST_LEAVE_ORGANIZATION_DOCUMENTATION)
    @UseGuards(JwtGuard)
    @Post("leave-organization/:id")
    async leaveOrganization(@AuthUserIdParam() organizerId: number,@Param("id") id: number,
    ): Promise<HttpResponse<null>> {
        await this.organizationService.leaveOrganization(id,organizerId);
        const payload = null;

        return createHttpResponse(
            HttpStatus.OK,
            "Organization successfully abandoned.",
            payload
        );
    }


    @ApiOperation(ADD_FAVORITE_DOCUMENTATION)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Post("favourite")
    async addFavorite(
        @Body() data: AddFavoriteOrganizationReqDto,
        @AuthUserIdParam() userId: number
    ): Promise<HttpResponse<void>> {
        const organizationId = data.organizationId;
        const payload = await this.organizationService.addFavorite(
            userId,
            organizationId
        );
        const message = "Organization added to favorites successfully.";
        return createHttpResponse(HttpStatus.OK, message, payload);
    }


    @ApiOperation(REMOVE_FAVORITE_DOCUMENTATION)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Delete("favourite/:id")
    async removeFavorite(
        @Param("id") id: number,
        @AuthUserIdParam() userId: number
    ): Promise<HttpResponse<void>> {
        const payload = await this.organizationService.removeFavorite(userId, id);
        const message = "Organization removed from favorites successfully.";
        return createHttpResponse(HttpStatus.OK, message, payload);
    }


    @ApiOperation(GET_FAVORITES_ORGANIZATIONS_DOCUMENTATION)
    @ApiCustomResponse(PublicRouteResponseDto)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get("favorites/get-favorites-for-organizer")
    async getFavouriteOrganizationsByOrganizer(
        @AuthUserIdParam() userId: number
    ): Promise<HttpResponse<GetOrganizationByOrganizerResDto[]>> {
        console.log(userId)
            const favorites = await this.organizationService.getFavoritesOrganizationsForOrganizer(userId);
            const payload = this.autoMapper.mapArray(favorites,Organization,GetOrganizationByOrganizerResDto);
        const message = "Favorites organizations retrieved successfully.";

        return createHttpResponse(HttpStatus.OK, message, payload);
    }


    @ApiOperation(GET_FAVOURITE_ORGANIZATIONS_BY_ORGANIZER_DOCUMENTATION)
    @ApiCustomResponse(PublicRouteResponseDto)
    @ApiBearerAuth()
    @UseGuards(JwtGuard)
    @Get("favourite/ids")
    async getFavouriteOrganizationsIdsByUser(
        @AuthUserIdParam() userId: number
    ): Promise<HttpResponse<{ id: number }[]>> {
        const favorites = await this.organizationService.getFavoritesOrganizationsForOrganizer(userId);

        if (!favorites) {
            throw new ConflictException("No organizations found.");
        }
        const message = "Organizations retrieved successfully.";
        const payload = favorites.map((organization) => ({
            id: organization.id,
        }));

        return createHttpResponse(HttpStatus.OK, message, payload);
    }


}
