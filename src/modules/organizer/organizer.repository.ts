import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatableOrganizer, EditableOrganizer } from "./organizer.type";
import { Organizer } from "src/entities/organizer.entity";

@Injectable()
export class OrganizerRepository {
  constructor(
    @InjectRepository(Organizer)
    private readonly organizerRepository: Repository<Organizer>
  ) {}

  findOne(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOne({ where: { id: id } });
  }
  findOneWithFav(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOne({ where: { id: id } ,relations: {favoriteOrganizations : true}});
  }


  findOneWithOrganizations(id: number): Promise<Organizer | null> {
    return this.organizerRepository.findOne({ where: { id: id } ,relations: {organizations: true}});
  }

  findOrganizerByEmail(email : string): Promise<Organizer | null>  {
      return this.organizerRepository.findOne({where: {email: email}})
  }

  create(creatableOrganizer: CreatableOrganizer): Promise<Organizer> {
    const organizer = this.organizerRepository.create(creatableOrganizer);
    return this.organizerRepository.save(organizer);
  }

  async update(
    id: number,
    editableOrganizer: EditableOrganizer
  ): Promise<Organizer> {
    await this.organizerRepository.update(id, editableOrganizer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.organizerRepository.delete(id);
  }

  async save(organizer: Organizer): Promise<Organizer> {
    return await this.organizerRepository.save(organizer);
  }
}
