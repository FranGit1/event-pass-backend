"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const configuration_service_1 = require("./configuration.service");
const configuration_module_1 = require("./configuration.module");
configuration_module_1.ConfigurationModule.forRoot();
const configService = new config_1.ConfigService();
const configurationService = new configuration_service_1.ConfigurationService(configService);
const migrationTypeOrmConfiguration = Object.assign({}, configurationService.getTypeOrmConfiguration);
exports.default = new typeorm_1.DataSource(migrationTypeOrmConfiguration);
//# sourceMappingURL=migration.configuration.js.map