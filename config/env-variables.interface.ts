export interface EnvironmentVariables {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  EMAIL: string;
  EMAIL_PASSWORD: string;
  EMAIL_SERVICE: string;
  EMAIL_PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  NODE_ENV: 'development' | 'staging' | 'production';
  PORT: number;
}
