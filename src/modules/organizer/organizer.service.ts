import { Injectable } from "@nestjs/common";

import { CreatableOrganizer, EditableOrganizer } from "./organizer.type";
import { Organizer } from "src/entities/organizer.entity";
import { OrganizerRepository } from "./organizer.repository";
import {OrganizerReqDto} from "../auth/dto/request/organizer.req.dto";
import {InjectMapper} from "@timonmasberg/automapper-nestjs";
import {Mapper} from "@automapper/core";

@Injectable()
export class OrganizerService {
  constructor(private readonly organizerRepository: OrganizerRepository,    @InjectMapper() private readonly autoMapper: Mapper
  ) {}

  findOne(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOne(id);
  }

  findOneWithFav(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOneWithFav(id);
  }

  findOneWithOrganizations(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOneWithOrganizations(id);
  }


  async findOrganizerByEmail(email : string){
    return await this.organizerRepository.findOrganizerByEmail(email);
  }

  create(creatableOrganizer: OrganizerReqDto): Promise<Organizer> {
    const organizer = this.autoMapper.map(creatableOrganizer,OrganizerReqDto,Organizer);
    return this.organizerRepository.create(organizer);
  }

  update(
    id: number,
    updateableOrganizer: EditableOrganizer
  ): Promise<Organizer> {
    return this.organizerRepository.update(id, updateableOrganizer);
  } save(
    organizer: Organizer
  ): Promise<Organizer> {
    return this.organizerRepository.save(organizer);
  }


  remove(id: number): Promise<void> {
    return this.organizerRepository.remove(id);
  }
}
