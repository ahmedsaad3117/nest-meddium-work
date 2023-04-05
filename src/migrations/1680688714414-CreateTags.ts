import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTags1680688714414 implements MigrationInterface {
    name = 'CreateTags1680688714414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_29133ba9c1abdc213d89e0e1d64" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."tags"`);
    }

}
