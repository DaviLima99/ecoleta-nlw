import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { config as setConfig } from 'dotenv';

setConfig();
setConfig({ path: '.dev.env' }); // use this if you use another .env file. Take the two setConfig if you use .env + other.env

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME || 'test',
    password: process.env.DATABASE_PASSWORD || 'test',
    database: process.env.DATABASE_NAME || 'test',
    entities: ['dist/**/*.entity{.ts,.js}'],
    charset: 'utf8mb4_unicode_ci',
    synchronize: process.env.ENV === 'dev' ? true : false,
    logging: process.env.ENV === 'dev' ? true : false,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
    migrations: ['dist/migrations/**/*.js'],
  }),
);
