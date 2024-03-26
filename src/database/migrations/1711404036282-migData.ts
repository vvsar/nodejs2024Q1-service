import { MigrationInterface, QueryRunner } from 'typeorm';

// yet senseless

export class MigData1711404036282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "login" character varying NOT NULL,
      "password" character varying NOT NULL,
      "version" integer NOT NULL DEFAULT '1',
      "createdAt" bigint NOT NULL,
      "updatedAt" bigint NOT NULL,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
