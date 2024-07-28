import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { UserLogsRepository } from "./user-logs.repository";
import { UserLogsService } from "./user-logs.service";
import {UserLogsEntity} from "../../entities/userLogs.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserLogsEntity]),
    AutoMapperModule,
  ],
  providers: [UserLogsRepository, UserLogsService],
  exports: [UserLogsService],
})
export class UserLogsModule {}
