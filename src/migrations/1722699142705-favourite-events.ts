import { MigrationInterface, QueryRunner } from "typeorm";

export class FavouriteEvents1722699142705 implements MigrationInterface {
    name = 'FavouriteEvents1722699142705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyer_favorite_events_event" ("buyer_id" integer NOT NULL, "event_id" integer NOT NULL, CONSTRAINT "PK_58ac694632bb6e52fe5b7fdb68b" PRIMARY KEY ("buyer_id", "event_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d2f6b4eb208b674e166b452ef" ON "buyer_favorite_events_event" ("buyer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc81dd23c80a295baa5cd7cf50" ON "buyer_favorite_events_event" ("event_id") `);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "slider_position" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyer_favorite_events_event" ADD CONSTRAINT "FK_6d2f6b4eb208b674e166b452efe" FOREIGN KEY ("buyer_id") REFERENCES "buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buyer_favorite_events_event" ADD CONSTRAINT "FK_fc81dd23c80a295baa5cd7cf50c" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyer_favorite_events_event" DROP CONSTRAINT "FK_fc81dd23c80a295baa5cd7cf50c"`);
        await queryRunner.query(`ALTER TABLE "buyer_favorite_events_event" DROP CONSTRAINT "FK_6d2f6b4eb208b674e166b452efe"`);
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "slider_position" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc81dd23c80a295baa5cd7cf50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d2f6b4eb208b674e166b452ef"`);
        await queryRunner.query(`DROP TABLE "buyer_favorite_events_event"`);
    }

}
