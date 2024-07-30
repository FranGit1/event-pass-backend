import { IsNotEmpty } from "class-validator";

export class EnvironmentVariables {
  // JWT

  @IsNotEmpty()
  JWT_SECRET: string;

  // Applications

  @IsNotEmpty()
  BACKEND_PRODUCTION_APPLICATION_URL: string;

  @IsNotEmpty()
  BACKEND_APPLICATION_URL: string;

  @IsNotEmpty()
  BACKEND_APPLICATION_PORT: string;

  @IsNotEmpty()
  ADMIN_APPLICATION_URL: string;

  // Database

  @IsNotEmpty()
  DATABASE_HOST: string;

  @IsNotEmpty()
  DATABASE_PORT: string;

  @IsNotEmpty()
  DATABASE_USER: string;

  @IsNotEmpty()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  DATABASE_NAME: string;

  @IsNotEmpty()
  RECAPTCHA_SECRET_KEY: string;

  @IsNotEmpty()
  FIREBASE_PROJECT_ID: string;
  @IsNotEmpty()
  FIREBASE_CLIENT_EMAIL: string;
  @IsNotEmpty()
  FIREBASE_PRIVATE_KEY: string;
  @IsNotEmpty()
  FIREBASE_BUCKET_NAME: string;
}
