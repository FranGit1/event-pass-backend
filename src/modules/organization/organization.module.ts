import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import { Organization } from "src/entities/organization.entity";
import { OrganizationController } from "./organization.controller";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationService } from "./organization.service";

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), AutoMapperModule],
  providers: [OrganizationRepository, OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}
