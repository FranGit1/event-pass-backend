// organization.service.ts
import { Injectable } from "@nestjs/common";
import {
  CreatableOrganization,
  EditableOrganization,
} from "./organization.type";
import { Organization } from "src/entities/organization.entity";
import { OrganizationRepository } from "./organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly organizationRepository: OrganizationRepository
  ) {}

  findOne(id: number): Promise<Organization | null> {
    return this.organizationRepository.findOne(id);
  }

  create(createableOrganization: CreatableOrganization): Promise<Organization> {
    return this.organizationRepository.create(createableOrganization);
  }

  update(
    id: number,
    updateableOrganization: EditableOrganization
  ): Promise<Organization> {
    return this.organizationRepository.update(id, updateableOrganization);
  }

  remove(id: number): Promise<void> {
    return this.organizationRepository.remove(id);
  }
}
