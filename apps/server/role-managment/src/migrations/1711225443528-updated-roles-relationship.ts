import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedRolesRelationship1711225443528
  implements MigrationInterface
{
  name = 'UpdatedRolesRelationship1711225443528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_daa7aa5ffd5401641951bb0fc60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "childrenId" TO "parentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_633896956090cdd56c930423f6d" FOREIGN KEY ("parentId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "FK_633896956090cdd56c930423f6d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" RENAME COLUMN "parentId" TO "childrenId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "FK_daa7aa5ffd5401641951bb0fc60" FOREIGN KEY ("childrenId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
