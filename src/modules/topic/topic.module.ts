import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Topic } from "src/entities/topic.entity";
import { TopicController } from "./topic.controller";
import { TopicRepository } from "./topic.repository";
import { TopicService } from "./topic.service";

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), AutoMapperModule],
  providers: [TopicRepository, TopicService],
  controllers: [TopicController],
  exports: [TopicService],
})
export class TopicModule {}
