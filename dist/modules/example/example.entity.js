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
exports.Example = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../shared/base/base.entity");
const columns_1 = require("../../shared/typeorm/columns");
const classes_1 = require("@automapper/classes");
let Example = class Example extends base_entity_1.BaseEntity {
};
__decorate([
    (0, classes_1.AutoMap)(),
    (0, columns_1.TextColumn)({ nullable: false }),
    __metadata("design:type", String)
], Example.prototype, "example", void 0);
__decorate([
    (0, classes_1.AutoMap)(),
    (0, columns_1.IntegerColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Example.prototype, "optional", void 0);
Example = __decorate([
    (0, typeorm_1.Entity)()
], Example);
exports.Example = Example;
//# sourceMappingURL=example.entity.js.map