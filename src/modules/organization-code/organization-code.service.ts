import { Injectable } from '@nestjs/common';
import { OrganizationCodeRepository } from './organization-code.repository';
import { OrganizationCode } from '../../entities/organization-code.entity';

@Injectable()
export class OrganizationCodeService {
  constructor(
      private readonly organizationCodeRepository: OrganizationCodeRepository,
  ) {}

  async createOrganizationCode(code: string, organization: any): Promise<OrganizationCode> {
    return await this.organizationCodeRepository.createOrganizationCode(code, organization);
  }

  async findByCode(code: string): Promise<OrganizationCode | undefined> {
    return await this.organizationCodeRepository.findByCode(code);
  }

  async markCodeAsUsed(code: OrganizationCode): Promise<OrganizationCode> {
    return await this.organizationCodeRepository.markCodeAsUsed(code);
  }
}
