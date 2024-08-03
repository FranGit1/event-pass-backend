// organization.service.ts
import {Injectable} from "@nestjs/common";
import {CreatableOrganization, EditableOrganization,} from "./organization.type";
import {Organization} from "src/entities/organization.entity";
import {OrganizationRepository} from "./organization.repository";

import {decodeOrganizationIdFromString, encodeOrganizationIdIntoString} from "../../shared/utils/utils";

import {OrganizationCodeService} from "../organization-code/organization-code.service";
import {OrganizerService} from "../organizer/organizer.service";

@Injectable()
export class OrganizationService {
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private organizationCodeService: OrganizationCodeService,
        private organizerService: OrganizerService,
    ) {
    }

    async generateOrganizationCode(organizationId: number): Promise<string> {
        const organization = await this.organizationRepository.findOrganizationById(organizationId);
        if (!organization) {
            throw new Error('Organization not found');
        }

        const code = encodeOrganizationIdIntoString(organizationId);
        await this.organizationCodeService.createOrganizationCode(code, organization);
        return code;
    }


    async joinOrganization(organizerId: number, code: string): Promise<void> {
        const organizationCode = await this.organizationCodeService.findByCode(code);

        if (!organizationCode || organizationCode.used) {
            throw new Error('Invalid or already used code');
        }


        const organizationId = organizationCode.organization.id
        const organization = await this.organizationRepository.findOne(organizationId);
        const organizer = await this.organizerService.findOne(organizerId);

        if (!organization || !organizer) {
            throw new Error('Invalid organization or organizer');
        }

        organization.organizers.push(organizer);
        await this.organizationRepository.save(organization);

        await this.organizationCodeService.markCodeAsUsed(organizationCode);
    }
    async findOne(id: number): Promise<Organization | null> {
         return await this.organizationRepository.findOne(id);
    }

    findAll(): Promise<Organization[] | null> {
        return this.organizationRepository.findAll();
    }

    async addFavorite(organizerId: number, organizationId: number): Promise<void> {
        const organizer = await this.organizerService.findOneWithFav(organizerId);
        const organization = await this.organizationRepository.findOne(organizationId);

        if (organizer && organization) {
            organizer.favoriteOrganizations = [...organizer.favoriteOrganizations, organization];
            await this.organizerService.save(organizer);
        }
    }

    async getFavoritesOrganizationsForOrganizer(organizerId: number){
        const organizer =  await this.organizerService.findOneWithFav(organizerId);
        return organizer.favoriteOrganizations;
    }

    async removeFavorite(organizerId: number, organizationId: number): Promise<void> {
        const organizer = await this.organizerService.findOneWithFav(organizerId);
        const organization = await this.organizationRepository.findOne(organizationId);

        if (organizer && organization) {
            organizer.favoriteOrganizations = organizer.favoriteOrganizations.filter(
                (favOrg) => favOrg.id !== organization.id
            );
            await this.organizerService.save(organizer);
        }
    }


    async leaveOrganization(organizationId: number,organizerId: number): Promise<boolean | null> {
        const organizer = await this.organizerService.findOneWithOrganizations(organizerId);
        const organization = await this.organizationRepository.findOne(organizationId);


        const orgIdNumber = Number(organizationId);


        const isPartOfOrganization = organizer.organizations.some(org => {
            return org.id === orgIdNumber;
        });

        if (!isPartOfOrganization) {
            return null;
        }




        organizer.organizations = organizer.organizations.filter(org => org.id !== orgIdNumber);

        await this.organizerService.save(organizer);
    }


    create(createableOrganization: CreatableOrganization): Promise<Organization> {
        return this.organizationRepository.create(createableOrganization);
    }


    async findOrganizationsByOrganizerId(id: number) {
        return await this.organizationRepository.findOrganizationsByOrganizer(id);

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
