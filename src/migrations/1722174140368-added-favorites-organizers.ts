import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedFavoritesOrganizers1722174140368 implements MigrationInterface {
    name = 'AddedFavoritesOrganizers1722174140368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organizer_favorite_organizations_organization" ("organizer_id" integer NOT NULL, "organization_id" integer NOT NULL, CONSTRAINT "PK_20f10c1ffa101245ee560f8e810" PRIMARY KEY ("organizer_id", "organization_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77326d82ad5bc8f696e32b1221" ON "organizer_favorite_organizations_organization" ("organizer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f754021b4cd5117e9a336db9d1" ON "organizer_favorite_organizations_organization" ("organization_id") `);
        await queryRunner.query(`ALTER TABLE "organizer_favorite_organizations_organization" ADD CONSTRAINT "FK_77326d82ad5bc8f696e32b1221d" FOREIGN KEY ("organizer_id") REFERENCES "organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizer_favorite_organizations_organization" ADD CONSTRAINT "FK_f754021b4cd5117e9a336db9d1f" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizer_favorite_organizations_organization" DROP CONSTRAINT "FK_f754021b4cd5117e9a336db9d1f"`);
        await queryRunner.query(`ALTER TABLE "organizer_favorite_organizations_organization" DROP CONSTRAINT "FK_77326d82ad5bc8f696e32b1221d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f754021b4cd5117e9a336db9d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77326d82ad5bc8f696e32b1221"`);
        await queryRunner.query(`DROP TABLE "organizer_favorite_organizations_organization"`);
    }

}
