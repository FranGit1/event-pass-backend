import { MigrationInterface, QueryRunner } from "typeorm";

export class OrgFieldRemove1720873416482 implements MigrationInterface {
    name = 'OrgFieldRemove1720873416482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "organizer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" ADD "organizer" character varying NOT NULL`);
    }

}
