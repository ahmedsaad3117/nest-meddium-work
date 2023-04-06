import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1680770259834 implements MigrationInterface {
    name = 'CreateUsers1680770259834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_29133ba9c1abdc213d89e0e1d64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL DEFAULT '', "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a6cc71bedf15a41a5f5ee8aea97" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."users"`);
        await queryRunner.query(`DROP TABLE "public"."tags"`);
    }

}
