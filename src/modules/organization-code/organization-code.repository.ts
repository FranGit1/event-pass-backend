import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {OrganizationCode} from "../../entities/organization-code.entity";

@Injectable()
export class OrganizationCodeRepository {
  constructor(
      @InjectRepository(OrganizationCode)
      private readonly organizationCodeRepository: Repository<OrganizationCode>
  ) {}

  async createOrganizationCode(code: string, organization: any): Promise<OrganizationCode> {
    const organizationCode = this.organizationCodeRepository.create({ code, organization });
    return await this.organizationCodeRepository.save(organizationCode);
  }

  async findByCode(code: string): Promise<OrganizationCode | undefined> {
    return await this.organizationCodeRepository.findOne({ where: { code }, relations: ['organization'] });
  }

  async markCodeAsUsed(code: OrganizationCode): Promise<OrganizationCode> {
    code.used = true;
    return await this.organizationCodeRepository.save(code);
  }
}
