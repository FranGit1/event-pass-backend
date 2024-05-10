"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExampleEntity1669718943047 = void 0;
class addExampleEntity1669718943047 {
    constructor() {
        this.name = 'addExampleEntity1669718943047';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "example" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "example" text NOT NULL, "optional" integer, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "example"`);
    }
}
exports.addExampleEntity1669718943047 = addExampleEntity1669718943047;
//# sourceMappingURL=1669718943047-add-example-entity.js.map