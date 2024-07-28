import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Organization } from "src/entities/organization.entity";
import { OrganizationController } from "./organization.controller";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationService } from "./organization.service";
import {OrganizationCodeModule} from "../organization-code/organization-code.module";
import {OrganizerModule} from "../organizer/organizer.module";

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), AutoMapperModule, OrganizationCodeModule, OrganizerModule],
  providers: [OrganizationRepository, OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}
