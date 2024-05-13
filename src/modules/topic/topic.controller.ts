import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { Topic } from "src/entities/topic.entity";
import { CreateTopicDto } from "./dto/request/create-topic.req.dto";
import { UpdateTopicDto } from "./dto/request/update-topic.req.dto";
import { TopicService } from "./topic.service";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@timonmasberg/automapper-nestjs";

@Controller("topics")
export class TopicController {
  constructor(
    private readonly topicService: TopicService,
    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Topic | null> {
    return this.topicService.findOne(id);
  }

  @Post()
  create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = this.autoMapper.map(createTopicDto, CreateTopicDto, Topic);
    return this.topicService.create(topic);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() updateTopicDto: UpdateTopicDto
  ): Promise<Topic> {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.topicService.remove(id);
  }
}
