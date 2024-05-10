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
exports.PrivateRouteRequestDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const is_optional_decorator_1 = require("../../../../shared/decorators/is-optional.decorator");
const class_transformer_1 = require("class-transformer");
class PrivateRouteRequestDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PrivateRouteRequestDto.prototype, "example", void 0);
__decorate([
    (0, is_optional_decorator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PrivateRouteRequestDto.prototype, "optional", void 0);
exports.PrivateRouteRequestDto = PrivateRouteRequestDto;
//# sourceMappingURL=private-route.req.dto.js.map