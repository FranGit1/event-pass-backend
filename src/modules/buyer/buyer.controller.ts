import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, UseGuards, HttpStatus, ConflictException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import {
  GET_BUYER_BY_ID_DOCUMENTATION,
  CREATE_BUYER_DOCUMENTATION,
  UPDATE_BUYER_DOCUMENTATION,
  DELETE_BUYER_BY_ID_DOCUMENTATION, GET_FAVORITES_EVENTS_DOCUMENTATION, GET_FAVOURITE_EVENT_IDS_BY_BUYER_DOCUMENTATION,
} from "./buyer.documentation";
import { Buyer } from "src/entities/buyer.entity";

import { BuyerService } from "./buyer.service";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";
import { CreateBuyerDto } from "./dto/request/create-buyer.req.dto";
import { UpdateBuyerDto } from "./dto/request/edit-buyer.req.dto";

import {ApiCustomResponse} from "../../shared/decorators/api-response.decorator";
import {PublicRouteResponseDto} from "../event/dto/response/public-route.res.dto";
import {JwtGuard} from "../auth/guards/jwt.guard";
import {AuthUserIdParam} from "../../shared/decorators/user.decorator";
import {HttpResponse} from "../../shared/http/http-response";


import {createHttpResponse} from "../../shared/http/create-http-response";
import {Event} from "../../entities/event.entity";
import {EventResDto} from "../event/dto/response/event.res.dto";

@ApiTags("Buyers")
@Controller("buyers")
export class BuyerController {
  constructor(
    private readonly buyerService: BuyerService,
    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  @ApiOperation(GET_BUYER_BY_ID_DOCUMENTATION)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<Buyer | null> {
    return this.buyerService.findOne(id);
  }

  @ApiOperation(CREATE_BUYER_DOCUMENTATION)
  @Post()
  create(@Body() createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    const buyer = this.autoMapper.map(createBuyerDto, CreateBuyerDto, Buyer);
    return this.buyerService.create(buyer);
  }

  @ApiOperation(UPDATE_BUYER_DOCUMENTATION)
  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateBuyerDto: UpdateBuyerDto
  ): Promise<Buyer> {
    return this.buyerService.update(id, updateBuyerDto);
  }

  @ApiOperation(DELETE_BUYER_BY_ID_DOCUMENTATION)
  @ApiBearerAuth()
  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    await this.buyerService.remove(id);
  }





  @ApiOperation(GET_FAVORITES_EVENTS_DOCUMENTATION)
  @ApiCustomResponse(PublicRouteResponseDto)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get("favorites/get-favorites-for-buyer")
  async getFavouritesEventsByBuyer(
      @AuthUserIdParam() userId: number
  ): Promise<HttpResponse<any[]>> {
    console.log(userId)
    const favorites = await this.buyerService.getFavoritesEventsBuBuyer(userId);


    const payload = favorites.map((event)=>{
      return {...this.autoMapper.map(event,Event,EventResDto), organization: {id: event.organization.id,
          title: event.organization.title
        }}
    })
    const message = "Favorites events retrieved successfully.";

    return createHttpResponse(HttpStatus.OK, message, payload);
  }

  @ApiOperation(GET_FAVOURITE_EVENT_IDS_BY_BUYER_DOCUMENTATION)
  @ApiCustomResponse(PublicRouteResponseDto)
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get("favourite/ids")
  async getFavouriteEventIdsByUser(
      @AuthUserIdParam() userId: number
  ): Promise<HttpResponse<{ id: number }[]>> {
    const favorites = await this.buyerService.getFavoritesEventsBuBuyer(userId);

    if (!favorites) {
      throw new ConflictException("No organizations found.");
    }
    const message = "Organizations retrieved successfully.";
    const payload = favorites.map((event) => ({
      id: event.id,
    }));

    return createHttpResponse(HttpStatus.OK, message, payload);
  }
}
