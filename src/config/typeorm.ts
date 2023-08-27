import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// I use dotenv to make sure the ConfigService loaded the environment variables before using it.
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'blog_cong_nghe',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
