import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFavoritesRelationsBetweenArticleAndUser21681116598056 implements MigrationInterface {
    name = 'AddFavoritesRelationsBetweenArticleAndUser21681116598056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."users_favorites_articles" ("usersId" integer NOT NULL, "articlesId" integer NOT NULL, CONSTRAINT "PK_79d6b9cb77541336d6058c33fb7" PRIMARY KEY ("usersId", "articlesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d079c815e929142b96e1975a26" ON "public"."users_favorites_articles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a52003f4f5531c539697c85ddf" ON "public"."users_favorites_articles" ("articlesId") `);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users_favorites_articles" ADD CONSTRAINT "FK_d079c815e929142b96e1975a266" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."users_favorites_articles" ADD CONSTRAINT "FK_a52003f4f5531c539697c85ddf0" FOREIGN KEY ("articlesId") REFERENCES "public"."articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users_favorites_articles" DROP CONSTRAINT "FK_a52003f4f5531c539697c85ddf0"`);
        await queryRunner.query(`ALTER TABLE "public"."users_favorites_articles" DROP CONSTRAINT "FK_d079c815e929142b96e1975a266"`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "public"."articles"."createdAt" IS NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a52003f4f5531c539697c85ddf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d079c815e929142b96e1975a26"`);
        await queryRunner.query(`DROP TABLE "public"."users_favorites_articles"`);
    }

}
