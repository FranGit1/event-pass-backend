import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigrations1720460407578 implements MigrationInterface {
    name = 'InitialMigrations1720460407578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buyer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."buyer_role_enum" DEFAULT 'buyer', CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "organizer" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" character varying NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "keywords" character varying NOT NULL, "feature_image" character varying NOT NULL, "display_in_slider" boolean NOT NULL, "slider_position" integer NOT NULL, "location_id" integer, "topic_id" integer, CONSTRAINT "REL_ff5c43e186f7faf15a975004d7" UNIQUE ("location_id"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "city" character varying NOT NULL, "country" character varying NOT NULL, "name" character varying NOT NULL, "latitude" character varying NOT NULL, "longitude" character varying NOT NULL, "event_id" integer, CONSTRAINT "REL_55ed1dcb5695902950df306167" UNIQUE ("event_id"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "keyword" character varying NOT NULL, "organizer" character varying NOT NULL, "legal_name" character varying, "slug" character varying NOT NULL, "organizer_logo" character varying NOT NULL, "organizer_description" character varying, "organizer_facebook" character varying, "organizer_link" character varying, "organizer_email" character varying, "organizer_instagram" character varying, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "username" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "company_name" character varying NOT NULL, "contact_information" character varying NOT NULL, CONSTRAINT "PK_b59551a131f312443b992f90434" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organizer_organizations_organization" ("organizer_id" integer NOT NULL, "organization_id" integer NOT NULL, CONSTRAINT "PK_097a0b12014ea409e533ce6b0d9" PRIMARY KEY ("organizer_id", "organization_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b563fac6175a01ea664bb2dad9" ON "organizer_organizations_organization" ("organizer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_64c708b412ddb1197f047213d5" ON "organizer_organizations_organization" ("organization_id") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_ff5c43e186f7faf15a975004d76" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f36fd3b4fa5b90f3bdefff5203b" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_55ed1dcb5695902950df3061675" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organizer_organizations_organization" ADD CONSTRAINT "FK_b563fac6175a01ea664bb2dad9a" FOREIGN KEY ("organizer_id") REFERENCES "organizer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organizer_organizations_organization" ADD CONSTRAINT "FK_64c708b412ddb1197f047213d54" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizer_organizations_organization" DROP CONSTRAINT "FK_64c708b412ddb1197f047213d54"`);
        await queryRunner.query(`ALTER TABLE "organizer_organizations_organization" DROP CONSTRAINT "FK_b563fac6175a01ea664bb2dad9a"`);
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_55ed1dcb5695902950df3061675"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f36fd3b4fa5b90f3bdefff5203b"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_ff5c43e186f7faf15a975004d76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_64c708b412ddb1197f047213d5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b563fac6175a01ea664bb2dad9"`);
        await queryRunner.query(`DROP TABLE "organizer_organizations_organization"`);
        await queryRunner.query(`DROP TABLE "organizer"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "topic"`);
        await queryRunner.query(`DROP TABLE "buyer"`);
    }

}
