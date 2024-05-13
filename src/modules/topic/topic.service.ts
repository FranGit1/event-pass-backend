import { Injectable } from "@nestjs/common";
import { TopicRepository } from "./topic.repository";
import { Topic } from "src/entities/topic.entity";
import { CreateTopicDto } from "./dto/request/create-topic.req.dto";
import { UpdateTopicDto } from "./dto/request/update-topic.req.dto";
import { CreatableTopic } from "./topic.type";

@Injectable()
export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  findOne(id: number): Promise<Topic | null> {
    return this.topicRepository.findOne(id);
  }

  create(createableTopic: CreatableTopic): Promise<Topic> {
    return this.topicRepository.create(createableTopic);
  }

  update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    return this.topicRepository.update(id, updateTopicDto);
  }

  remove(id: number): Promise<void> {
    return this.topicRepository.remove(id);
  }
}
