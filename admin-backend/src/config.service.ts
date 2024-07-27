import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  get isDevelopment() {
    const mode = this.getValue('MODE', false);
    return mode === 'DEV';
  }

  get isProduction() {
    const mode = this.getValue('MODE', false);
    return mode === 'PROD';
  }

  get isTest() {
    const mode = this.getValue('MODE', false);
    return mode === 'TEST';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    const options = {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      ssl: this.isProduction,
      migrationsRun: true,
      logging: ['error'],
      logger: 'advanced-console',
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
    if (this.isProduction) {
      options['extra'] = { ssl: { rejectUnauthorized: false } };
    }
    return options as TypeOrmModuleOptions;
  }

  getDataSourceConfig() {
    console.log([__dirname + 'migrations/*{.ts,.js}']);
    const options: DataSourceOptions = {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      ssl: this.isProduction,
      migrationsRun: true,
      logging: ['error'],
      logger: 'advanced-console',
    };

    return options;
  }

  getBucketConfig() {
    return {
      region: this.getValue('AWS_BUCKET_REGION'),
      secretAccessKey: this.getValue('AWS_BUCKET_SECRET_KEY'),
      accessKeyId: this.getValue('AWS_BUCKET_ACCESS_KEY_ID'),
      bucket: this.getValue('AWS_BUCKET_NAME'),
      endpoint: this.isDevelopment ? 'http://127.0.0.1:9000' : null,
      s3ForcePathStyle: this.isDevelopment ? true : null,
    };
  }

  getAppConfig = () => ({
    clientHost: this.getValue('CLIENT_HOST'),
    domain: this.getValue('DOMAIN'),
    PORT: this.getValue('PORT', false) || 3001,
  });

  getGoogleConfig = () => ({
    clientId: this.getValue('GOOGLE_CLIENT_ID'),
    secret: this.getValue('GOOGLE_SECRET'),
  });

  getJwtConfig = () => ({
    secret: this.getValue('JWT_ACCESS_TOKEN_SECRET'),
    expiresIn: this.getValue('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
  });
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',

  'AWS_BUCKET_ACCESS_KEY_ID',
  'AWS_BUCKET_SECRET_KEY',
  'AWS_BUCKET_REGION',
  'AWS_BUCKET_NAME',

  'GOOGLE_CLIENT_ID',
  'GOOGLE_SECRET',
  'CLIENT_HOST',
  'DOMAIN',

  'JWT_ACCESS_TOKEN_SECRET',
  'JWT_ACCESS_TOKEN_EXPIRATION_TIME',

]);

export { configService };
