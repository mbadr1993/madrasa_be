import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1773240342014 implements MigrationInterface {
    name = 'Migration1773240342014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "governorate"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "UQ_aa6e74e96ed2dddfcf09782110a" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "affiliationBoard" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "emailAddress" character varying`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "websiteUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdById" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_45c0d39d1f9ceeb56942db93cc5"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdById"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "websiteUrl"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "affiliationBoard"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "UQ_aa6e74e96ed2dddfcf09782110a"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "governorate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "area" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organization" ADD "logoUrl" character varying`);
    }

}
