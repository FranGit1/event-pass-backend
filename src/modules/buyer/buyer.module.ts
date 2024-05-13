import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Buyer } from "src/entities/buyer.entity";
import { BuyerController } from "./buyer.controller";
import { BuyerRepository } from "./buyer.repository";
import { BuyerService } from "./buyer.service";

@Module({
  imports: [TypeOrmModule.forFeature([Buyer]), AutoMapperModule],
  providers: [BuyerRepository, BuyerService],
  controllers: [BuyerController],
  exports: [BuyerService],
})
export class BuyerModule {}
