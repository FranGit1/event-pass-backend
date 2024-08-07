// organization.repository.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreatableOrganization,
  EditableOrganization,
} from "./organization.type";
import { Organization } from "src/entities/organization.entity";

@Injectable()
export class OrganizationRepository {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>
  ) {}

  findOne(id: number): Promise<Organization | null> {
    return this.organizationRepository.findOne({ where: { id: id },relations: {organizers : true} });
  }

  async findAll(): Promise<Organization[] | null> {
    return await this.organizationRepository.find();

  }

  async findOrganizationById(id: number): Promise<Organization | null> {
    return await this.organizationRepository.findOne({ where: { id } });
  }



  create(creatableOrganization: CreatableOrganization): Promise<Organization> {
    const organization = this.organizationRepository.create(
      creatableOrganization
    );
    return this.organizationRepository.save(organization);
  }


  save(creatableOrganization: CreatableOrganization): Promise<Organization> {

    return this.organizationRepository.save(creatableOrganization);
  }
  async findOrganizationsByOrganizer(organizerId: number): Promise<Organization[]> {
    return await this.organizationRepository.find({
      where: {
        organizers: {
          id: organizerId
        }
      },
      relations: {
        organizers: true,
        events: true
      }
    });

  }
  async update(
    id: number,
    editableOrganization: EditableOrganization
  ): Promise<Organization> {
    await this.organizationRepository.update(id, editableOrganization);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.organizationRepository.delete(id);
  }
}
