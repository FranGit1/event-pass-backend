"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const configuration_module_1 = require("./configuration/configuration.module");
const example_module_1 = require("./example/example.module");
const logger_module_1 = require("./logger/logger.module");
const orm_module_1 = require("./orm/orm.module");
const automapper_module_1 = require("./automapper/automapper.module");
const coreModules = [configuration_module_1.ConfigurationModule, orm_module_1.OrmModule, logger_module_1.LoggerModule, automapper_module_1.AutoMapperModule];
const appModules = [auth_module_1.AuthModule, example_module_1.ExampleModule];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [...coreModules, ...appModules]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map