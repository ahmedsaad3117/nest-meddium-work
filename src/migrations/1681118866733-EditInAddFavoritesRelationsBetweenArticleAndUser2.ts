import {MigrationInterface, QueryRunner} from "typeorm";

export class EditInAddFavoritesRelationsBetweenArticleAndUser21681118866733 implements MigrationInterface {
    name = 'EditInAddFavoritesRelationsBetweenArticleAndUser21681118866733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."articles_favorites_articles" ("articlesId_1" integer NOT NULL, "articlesId_2" integer NOT NULL, CONSTRAINT "PK_37b35ab75308ab98c538260f460" PRIMARY KEY ("articlesId_1", "articlesId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6cffe48aa80df38c9caa833de9" ON "public"."articles_favorites_articles" ("articlesId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c8238135b24de920440d73be1" ON "public"."articles_favorites_articles" ("articlesId_2") `);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "public"."articles_favorites_articles" ADD CONSTRAINT "FK_6cffe48aa80df38c9caa833de9d" FOREIGN KEY ("articlesId_1") REFERENCES "public"."articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."articles_favorites_articles" ADD CONSTRAINT "FK_0c8238135b24de920440d73be1d" FOREIGN KEY ("articlesId_2") REFERENCES "public"."articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."articles_favorites_articles" DROP CONSTRAINT "FK_0c8238135b24de920440d73be1d"`);
        await queryRunner.query(`ALTER TABLE "public"."articles_favorites_articles" DROP CONSTRAINT "FK_6cffe48aa80df38c9caa833de9d"`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c8238135b24de920440d73be1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6cffe48aa80df38c9caa833de9"`);
        await queryRunner.query(`DROP TABLE "public"."articles_favorites_articles"`);
    }

}
