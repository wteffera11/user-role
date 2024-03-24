import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedUserManagementTable1711222579510
  implements MigrationInterface
{
  name = 'RemovedUserManagementTable1711222579510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "childrenId" uuid, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_daa7aa5ffd5401641951bb0fc60" FOREIGN KEY ("childrenId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_daa7aa5ffd5401641951bb0fc60"`,
    );
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
