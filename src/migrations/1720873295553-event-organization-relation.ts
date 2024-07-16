import { MigrationInterface, QueryRunner } from "typeorm";

export class EventOrganizationRelation1720873295553 implements MigrationInterface {
    name = 'EventOrganizationRelation1720873295553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "organizer" TO "organization_id"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "organization_id" integer`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f476008fe61c6e93f2fe8a3d124" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f476008fe61c6e93f2fe8a3d124"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "organization_id"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "organization_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "organization_id" TO "organizer"`);
    }

}
