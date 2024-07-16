import { Injectable } from "@nestjs/common";

import { CreatableOrganizer, EditableOrganizer } from "./organizer.type";
import { Organizer } from "src/entities/organizer.entity";
import { OrganizerRepository } from "./organizer.repository";

@Injectable()
export class OrganizerService {
  constructor(private readonly organizerRepository: OrganizerRepository) {}

  findOne(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOne(id);
  }




  create(createableOrganizer: CreatableOrganizer): Promise<Organizer> {
    return this.organizerRepository.create(createableOrganizer);
  }

  update(
    id: number,
    updateableOrganizer: EditableOrganizer
  ): Promise<Organizer> {
    return this.organizerRepository.update(id, updateableOrganizer);
  }

  remove(id: number): Promise<void> {
    return this.organizerRepository.remove(id);
  }
}
