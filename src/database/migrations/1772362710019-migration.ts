import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1772362710019 implements MigrationInterface {
    name = 'Migration1772362710019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "password" TO "hash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "hash" TO "password"`);
    }

}
