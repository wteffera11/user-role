import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserManagementInitialMigration1711222146366
  implements MigrationInterface
{
  name = 'UserManagementInitialMigration1711222146366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles_management" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "childrenId" uuid, CONSTRAINT "PK_df6345a86a26e4492ec2341f5c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_management" ADD CONSTRAINT "FK_baf5ab5b3784ac675a48a36a9cf" FOREIGN KEY ("childrenId") REFERENCES "roles_management"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_management" DROP CONSTRAINT "FK_baf5ab5b3784ac675a48a36a9cf"`,
    );
    await queryRunner.query(`DROP TABLE "roles_management"`);
  }
}
