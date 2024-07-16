import { MigrationInterface, QueryRunner } from "typeorm";

export class EventFieldRename1720972334272 implements MigrationInterface {
    name = 'EventFieldRename1720972334272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "feature_image" TO "featured_image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "featured_image" TO "feature_image"`);
    }

}
