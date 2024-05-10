"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const winston = require("winston");
const path_1 = require("path");
const configuration_types_1 = require("./configuration.types");
let ConfigurationService = class ConfigurationService {
    constructor(configService) {
        this.configService = configService;
    }
    get getTypeOrmConfiguration() {
        return {
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            type: 'postgres',
            host: this.databaseHost,
            port: this.databasePort,
            username: this.databaseUser,
            password: this.databasePassword,
            database: this.databaseName,
            migrationsTableName: 'migration',
            entities: [(0, path_1.join)(__dirname, '../..', '**', '*.entity.{ts,js}')],
            migrations: [(0, path_1.join)(__dirname, '../..', 'migrations', '*.ts')]
        };
    }
    get getJwtConfiguration() {
        return {
            secret: this.jwtSecret,
            signOptions: { expiresIn: '8h' }
        };
    }
    get getWinstonConfiguration() {
        const consoleFormat = winston.format.combine(winston.format.colorize({
            all: true
        }), winston.format.label({
            label: '[LOGGER]'
        }), winston.format.timestamp({
            format: 'MM/DD/YYYY hh:mm:ss.sss A'
        }), winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message} `));
        const format = winston.format.combine(winston.format.timestamp(), winston.format.json());
        const transports = [
            new winston.transports.Console({ format: consoleFormat })
        ];
        return { format, transports };
    }
    static validate(config) {
        const validatedConfig = (0, class_transformer_1.plainToInstance)(configuration_types_1.EnvironmentVariables, config, {
            enableImplicitConversion: true
        });
        const errors = (0, class_validator_1.validateSync)(validatedConfig, {
            skipMissingProperties: false
        });
        if (errors.length > 0) {
            throw new Error(errors.toString());
        }
        return validatedConfig;
    }
    get jwtSecret() {
        return this.configService.get('JWT_SECRET');
    }
    get getBackendProductionApplicationUrl() {
        return this.configService.get('BACKEND_PRODUCTION_APPLICATION_URL');
    }
    get getBackendApplicationUrl() {
        return this.configService.get('BACKEND_APPLICATION_URL');
    }
    get getBackendApplicationPort() {
        return this.configService.get('BACKEND_APPLICATION_PORT');
    }
    get getAdminApplicationUrl() {
        return this.configService.get('ADMIN_APPLICATION_URL');
    }
    get isProduction() {
        return this.getBackendProductionApplicationUrl === this.getBackendApplicationUrl;
    }
    get databaseHost() {
        return this.configService.get('DATABASE_HOST');
    }
    get databasePort() {
        return this.configService.get('DATABASE_PORT');
    }
    get databaseUser() {
        return this.configService.get('DATABASE_USER');
    }
    get databasePassword() {
        return this.configService.get('DATABASE_PASSWORD');
    }
    get databaseName() {
        return this.configService.get('DATABASE_NAME');
    }
};
ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map