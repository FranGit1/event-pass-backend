"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const example_controller_1 = require("./example.controller");
const example_entity_1 = require("./example.entity");
const example_repository_1 = require("./example.repository");
const example_service_1 = require("./example.service");
const auth_module_1 = require("../auth/auth.module");
const example_profile_1 = require("./example.profile");
let ExampleModule = class ExampleModule {
};
ExampleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([example_entity_1.Example]), auth_module_1.AuthModule],
        providers: [example_repository_1.ExampleRepository, example_service_1.ExampleService, example_profile_1.ExampleProfile],
        controllers: [example_controller_1.ExampleController]
    })
], ExampleModule);
exports.ExampleModule = ExampleModule;
//# sourceMappingURL=example.module.js.map