import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { JwtModuleOptions } from '@nestjs/jwt';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';

import { EnvironmentVariables } from './configuration.types';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  get getTypeOrmConfiguration(): TypeOrmModuleOptions {
    return {
      namingStrategy: new SnakeNamingStrategy(),
      type: 'postgres',
      host: this.databaseHost,
      port: this.databasePort,
      username: this.databaseUser,
      password: this.databasePassword,
      database: this.databaseName,
      migrationsTableName: 'migration',
      entities: [join(__dirname, '../..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, '../..', 'migrations', '*.ts')]
    };
  }

  get getJwtConfiguration(): JwtModuleOptions {
    return {
      secret: this.jwtSecret,
      signOptions: { expiresIn: '8h' }
    };
  }

  get getWinstonConfiguration(): WinstonModuleOptions {
    const consoleFormat = winston.format.combine(
      winston.format.colorize({
        all: true
      }),
      winston.format.label({
        label: '[LOGGER]'
      }),
      winston.format.timestamp({
        format: 'MM/DD/YYYY hh:mm:ss.sss A'
      }),
      winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message} `)
    );

    const format = winston.format.combine(winston.format.timestamp(), winston.format.json());

    const transports: winston.transport | winston.transport[] = [
      new winston.transports.Console({ format: consoleFormat })
    ];

    return { format, transports };
  }

  // Configuration Validator

  static validate(config: Record<string, unknown>) {
    const validatedConfig: EnvironmentVariables = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }

  // JWT

  get jwtSecret(): string {
    return this.configService.get('JWT_SECRET');
  }

  // Applications

  get getBackendProductionApplicationUrl(): string {
    return this.configService.get('BACKEND_PRODUCTION_APPLICATION_URL');
  }

  get getBackendApplicationUrl(): string {
    return this.configService.get('BACKEND_APPLICATION_URL');
  }

  get getBackendApplicationPort(): number {
    return this.configService.get('BACKEND_APPLICATION_PORT');
  }

  get getAdminApplicationUrl(): string {
    return this.configService.get('ADMIN_APPLICATION_URL');
  }

  get isProduction(): boolean {
    return this.getBackendProductionApplicationUrl === this.getBackendApplicationUrl;
  }

  // Database

  get databaseHost(): string {
    return this.configService.get('DATABASE_HOST');
  }

  get databasePort(): number {
    return this.configService.get('DATABASE_PORT');
  }

  get databaseUser(): string {
    return this.configService.get('DATABASE_USER');
  }

  get databasePassword(): string {
    return this.configService.get('DATABASE_PASSWORD');
  }

  get databaseName(): string {
    return this.configService.get('DATABASE_NAME');
  }
}
