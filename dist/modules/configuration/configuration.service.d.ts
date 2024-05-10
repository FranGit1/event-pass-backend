import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { WinstonModuleOptions } from 'nest-winston';
import { EnvironmentVariables } from './configuration.types';
export declare class ConfigurationService {
    private configService;
    constructor(configService: ConfigService<EnvironmentVariables>);
    get getTypeOrmConfiguration(): TypeOrmModuleOptions;
    get getJwtConfiguration(): JwtModuleOptions;
    get getWinstonConfiguration(): WinstonModuleOptions;
    static validate(config: Record<string, unknown>): EnvironmentVariables;
    get jwtSecret(): string;
    get getBackendProductionApplicationUrl(): string;
    get getBackendApplicationUrl(): string;
    get getBackendApplicationPort(): number;
    get getAdminApplicationUrl(): string;
    get isProduction(): boolean;
    get databaseHost(): string;
    get databasePort(): number;
    get databaseUser(): string;
    get databasePassword(): string;
    get databaseName(): string;
}
