import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import validateConfig from '@/utils/validate';

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
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_DOMAIN: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  BACKEND_DOMAIN: string;

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

// const firebaseConfig = {
//   apiKey: "AIzaSyDHMAEVTI_YQj8j4BOok5GL5vY48G4KSQo",
//   authDomain: "taphoa-da0bb.firebaseapp.com",
//   projectId: "taphoa-da0bb",
//   storageBucket: "taphoa-da0bb.appspot.com",
//   messagingSenderId: "840042963851",
//   appId: "1:840042963851:web:af1d8c1b614482a103858e",
// };
