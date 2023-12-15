import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import { validateConfig } from '@/utils/validate';

import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsOptional()
  @IsUrl({ require_tld: false })
  FRONTEND_DOMAIN: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  BACKEND_DOMAIN: string;

  @IsOptional()
  @IsString()
  DATABASE_URL: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000,
    databaseUri: process.env.DATABASE_URL,
  };
});
