import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "src/entities/topic.entity";
import { Repository } from "typeorm";
import { CreateTopicDto } from "./dto/request/create-topic.req.dto";
import { UpdateTopicDto } from "./dto/request/update-topic.req.dto";
import { CreatableTopic, EditableTopic } from "./topic.type";

@Injectable()
export class TopicRepository {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>
  ) {}

  findOne(id: number): Promise<Topic | null> {
    return this.topicRepository.findOne({ where: { id: id } });
  }

  create(createableTopic: CreatableTopic): Promise<Topic> {
    const topic = this.topicRepository.create(createableTopic);
    return this.topicRepository.save(topic);
  }

  async update(id: number, updatebleTopic: EditableTopic): Promise<Topic> {
    await this.topicRepository.update(id, updatebleTopic);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.topicRepository.delete(id);
  }
}
