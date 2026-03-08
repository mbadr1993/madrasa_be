import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1772891809225 implements MigrationInterface {
  name = 'Migration1772891809225';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ensure columns are only created if they don't already exist
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "firstName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "lastName" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // dropping columns; IF EXISTS is safer but not supported by all drivers, so keep simple
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
  }
}
