import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFollows1681199309469 implements MigrationInterface {
    name = 'CreateFollows1681199309469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
    }

}
