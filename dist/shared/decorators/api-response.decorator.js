"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCustomResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_response_1 = require("../http/http-response");
const ApiCustomResponse = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(http_response_1.HttpResponse, dataDto), (0, swagger_1.ApiOkResponse)({
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(http_response_1.HttpResponse) },
            {
                properties: {
                    payload: {
                        $ref: (0, swagger_1.getSchemaPath)(dataDto)
                    }
                }
            }
        ]
    }
}));
exports.ApiCustomResponse = ApiCustomResponse;
//# sourceMappingURL=api-response.decorator.js.map