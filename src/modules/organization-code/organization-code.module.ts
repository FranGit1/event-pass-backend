import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AutoMapperModule } from "../automapper/automapper.module";
import {OrganizationCode} from "../../entities/organization-code.entity";
import {OrganizationCodeService} from "./organization-code.service";
import {OrganizationCodeRepository} from "./organization-code.repository";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationCode]), AutoMapperModule],
  providers: [OrganizationCodeRepository, OrganizationCodeService],
  exports: [OrganizationCodeRepository, OrganizationCodeService],
})
export class OrganizationCodeModule {}
