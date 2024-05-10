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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleProfile = void 0;
const automapper_nestjs_1 = require("@timonmasberg/automapper-nestjs");
const core_1 = require("@automapper/core");
const public_route_res_dto_1 = require("./dtos/response/public-route.res.dto");
const private_route_res_dto_1 = require("./dtos/response/private-route.res.dto");
const example_entity_1 = require("./example.entity");
let ExampleProfile = class ExampleProfile extends automapper_nestjs_1.AutomapperProfile {
    constructor(mapper) {
        super(mapper);
    }
    get profile() {
        return (mapper) => {
            (0, core_1.createMap)(mapper, example_entity_1.Example, private_route_res_dto_1.PrivateRouteResponseDto);
            (0, core_1.createMap)(mapper, example_entity_1.Example, public_route_res_dto_1.PublicRouteResponseDto);
        };
    }
};
ExampleProfile = __decorate([
    __param(0, (0, automapper_nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object])
], ExampleProfile);
exports.ExampleProfile = ExampleProfile;
//# sourceMappingURL=example.profile.js.map