import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationsBetweenArticleAndUser1681033236448 implements MigrationInterface {
    name = 'AddRelationsBetweenArticleAndUser1681033236448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."articles" ADD "authorId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "public"."articles" ADD CONSTRAINT "FK_838c3bc81cbb4cc3001c9f7d0a6" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."articles" DROP CONSTRAINT "FK_838c3bc81cbb4cc3001c9f7d0a6"`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "public"."articles" DROP COLUMN "authorId"`);
    }

}
