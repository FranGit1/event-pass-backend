import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLogsEntity1721333015164 implements MigrationInterface {
    name = 'UserLogsEntity1721333015164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_logs_entity_event_enum" AS ENUM('LOGIN_SUCCESSFUL', 'LOGIN_FAILED', 'LOGOUT')`);
        await queryRunner.query(`CREATE TABLE "user_logs_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "event" "public"."user_logs_entity_event_enum" NOT NULL, "payload" jsonb, "buyer_id" integer, "organizer_id" integer, CONSTRAINT "PK_e83850d4d7af744d7ce7d5a9395" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."organizer_role_enum" AS ENUM('buyer', 'organizer')`);
        await queryRunner.query(`ALTER TABLE "organizer" ADD "role" "public"."organizer_role_enum" DEFAULT 'organizer'`);
        await queryRunner.query(`ALTER TYPE "public"."buyer_role_enum" RENAME TO "buyer_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."buyer_role_enum" AS ENUM('buyer', 'organizer')`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" TYPE "public"."buyer_role_enum" USING "role"::"text"::"public"."buyer_role_enum"`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`DROP TYPE "public"."buyer_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user_logs_entity" ADD CONSTRAINT "FK_888e6fc79b8d9af5d40d34956ec" FOREIGN KEY ("buyer_id") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_logs_entity" ADD CONSTRAINT "FK_26863a872b231ece09a186e40e6" FOREIGN KEY ("organizer_id") REFERENCES "organizer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_logs_entity" DROP CONSTRAINT "FK_26863a872b231ece09a186e40e6"`);
        await queryRunner.query(`ALTER TABLE "user_logs_entity" DROP CONSTRAINT "FK_888e6fc79b8d9af5d40d34956ec"`);
        await queryRunner.query(`CREATE TYPE "public"."buyer_role_enum_old" AS ENUM('buyer')`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" TYPE "public"."buyer_role_enum_old" USING "role"::"text"::"public"."buyer_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "buyer" ALTER COLUMN "role" SET DEFAULT 'buyer'`);
        await queryRunner.query(`DROP TYPE "public"."buyer_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."buyer_role_enum_old" RENAME TO "buyer_role_enum"`);
        await queryRunner.query(`ALTER TABLE "organizer" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."organizer_role_enum"`);
        await queryRunner.query(`DROP TABLE "user_logs_entity"`);
        await queryRunner.query(`DROP TYPE "public"."user_logs_entity_event_enum"`);
    }

}
