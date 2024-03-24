/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: '.env' });

export const TypeOrmConfigHelper = {
  DATABASE_HOST: process.env.DATABASE_HOST ?? 'localhost',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT ?? '5432'),
  DATABASE_NAME: process.env.DATABASE_NAME ?? 'roles',
  DATABASE_USER: process.env.DATABASE_USER ?? 'postgres',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? 'admin',
};

const pathPrefix =
  process.env.DOT_ENV === 'production' ? 'apps/server/role-management' : '';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: TypeOrmConfigHelper.DATABASE_HOST,
  port: Number(TypeOrmConfigHelper.DATABASE_PORT),
  database: TypeOrmConfigHelper.DATABASE_NAME,
  username: TypeOrmConfigHelper.DATABASE_USER,
  password: TypeOrmConfigHelper.DATABASE_PASSWORD,
  entities: [`./dist/src/**/*.entity.js`],
  migrations: [`./dist/src/migrations/*.js`],
  migrationsRun: true,

  // seeds: [`${pathPrefix}dist/modules/seeders/**.seeder.{ts,js}`],
  migrationsTableName: 'typeorm_migrations',
  logger: 'advanced-console',
  logging: 'all',
  synchronize: false,
};

function getMigrationDirectory() {
  const directory =
    process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  return `${pathPrefix}/dist/migrations/**/*{.ts,.js}`;
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
