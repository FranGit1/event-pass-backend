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
  GET_BUYER_BY_ID_DOCUMENTATION,
  CREATE_BUYER_DOCUMENTATION,
  UPDATE_BUYER_DOCUMENTATION,
  DELETE_BUYER_BY_ID_DOCUMENTATION,
} from "./buyer.documentation";
import { Buyer } from "src/entities/buyer.entity";

import { BuyerService } from "./buyer.service";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";
import { CreateBuyerDto } from "./dto/request/create-buyer.req.dto";
import { UpdateBuyerDto } from "./dto/request/edit-buyer.req.dto";

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
}
