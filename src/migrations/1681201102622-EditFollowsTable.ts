import {MigrationInterface, QueryRunner} from "typeorm";

export class EditFollowsTable1681201102622 implements MigrationInterface {
    name = 'EditFollowsTable1681201102622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."follows" ("id" SERIAL NOT NULL, "followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "PK_4565a8e0027400e3f599041578a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`DROP TABLE "public"."follows"`);
    }

}
