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
exports.ExampleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_decorator_1 = require("../../shared/decorators/public.decorator");
const create_http_response_1 = require("../../shared/http/create-http-response");
const logger_interceptor_1 = require("../../shared/interceptors/logger.interceptor");
const jwt_guard_1 = require("../auth/jwt.guard");
const private_route_req_dto_1 = require("./dtos/request/private-route.req.dto");
const private_route_res_dto_1 = require("./dtos/response/private-route.res.dto");
const public_route_res_dto_1 = require("./dtos/response/public-route.res.dto");
const example_documentation_1 = require("./example.documentation");
const example_service_1 = require("./example.service");
const auth_service_1 = require("../auth/auth.service");
const api_response_decorator_1 = require("../../shared/decorators/api-response.decorator");
const automapper_nestjs_1 = require("@timonmasberg/automapper-nestjs");
const example_entity_1 = require("./example.entity");
const jwt_route_res_dto_1 = require("./dtos/response/jwt-route.res.dto");
let ExampleController = class ExampleController {
    constructor(autoMapper, exampleService, authService) {
        this.autoMapper = autoMapper;
        this.exampleService = exampleService;
        this.authService = authService;
    }
    async privateRoute(body) {
        const example = await this.exampleService.save(body);
        const message = 'Example stored successfully.';
        const payload = this.autoMapper.map(example, example_entity_1.Example, private_route_res_dto_1.PrivateRouteResponseDto);
        return (0, create_http_response_1.createHttpResponse)(common_1.HttpStatus.CREATED, message, payload);
    }
    async publicRoute(id) {
        const example = await this.exampleService.findOneById(id);
        if (!example)
            throw new common_1.ConflictException('Example not found.');
        const message = 'Example retrieved successfully.';
        const payload = this.autoMapper.map(example, example_entity_1.Example, public_route_res_dto_1.PublicRouteResponseDto);
        return (0, create_http_response_1.createHttpResponse)(common_1.HttpStatus.OK, message, payload);
    }
    async generateJwt() {
        const jwt = await this.authService.generateJwt('demo id');
        const message = 'You can find a demo JWT in the payload.';
        const payload = { token: jwt };
        return (0, create_http_response_1.createHttpResponse)(common_1.HttpStatus.OK, message, payload);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)(example_documentation_1.PRIVATE_ROUTE_DOCUMENTATION),
    (0, api_response_decorator_1.ApiCustomResponse)(private_route_res_dto_1.PrivateRouteResponseDto),
    (0, common_1.Post)('/private-post-route'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [private_route_req_dto_1.PrivateRouteRequestDto]),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "privateRoute", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)(example_documentation_1.PUBLIC_ROUTE_DOCUMENTATION),
    (0, api_response_decorator_1.ApiCustomResponse)(public_route_res_dto_1.PublicRouteResponseDto),
    (0, common_1.Get)('/public-get-route/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "publicRoute", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)(example_documentation_1.JWT_ROUTE_DOCUMENTATION),
    (0, api_response_decorator_1.ApiCustomResponse)(jwt_route_res_dto_1.JwtRouteResponseDto),
    (0, common_1.Post)('/generate-jwt'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "generateJwt", null);
ExampleController = __decorate([
    (0, swagger_1.ApiTags)('Examples'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.UseInterceptors)(logger_interceptor_1.LoggerInterceptor),
    (0, common_1.Controller)('/examples'),
    __param(0, (0, automapper_nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [Object, example_service_1.ExampleService,
        auth_service_1.AuthService])
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=example.controller.js.map