import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizationCodeEntity1721671361485 implements MigrationInterface {
    name = 'OrganizationCodeEntity1721671361485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization_code" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "code" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "organization_id" integer, CONSTRAINT "PK_c54c4df190aef63c21cd1d03ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "organization_code" ADD CONSTRAINT "FK_ffde6d48a9462c3663f67c54b42" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization_code" DROP CONSTRAINT "FK_ffde6d48a9462c3663f67c54b42"`);
        await queryRunner.query(`DROP TABLE "organization_code"`);
    }

}
