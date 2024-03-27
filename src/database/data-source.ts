import { config } from 'dotenv';
// import path from 'path';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'db',
  database: process.env.POSTGRES_DB,
  port: +process.env.POSTGRES_PORT || 5432,
  synchronize: false,
  entities: [`${__dirname}/../api/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*.ts`],
});
