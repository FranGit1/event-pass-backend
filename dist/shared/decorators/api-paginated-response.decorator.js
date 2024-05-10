"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCustomPaginatedResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const http_response_1 = require("../http/http-response");
const ApiCustomPaginatedResponse = (dataDto) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(http_response_1.HttpResponse, http_response_1.PaginatedPayload, dataDto), (0, swagger_1.ApiOkResponse)({
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(http_response_1.HttpResponse) },
            {
                properties: {
                    payload: {
                        type: 'object',
                        allOf: [{ $ref: (0, swagger_1.getSchemaPath)(http_response_1.PaginatedPayload) }],
                        properties: {
                            items: {
                                type: 'array',
                                items: { $ref: (0, swagger_1.getSchemaPath)(dataDto) }
                            }
                        }
                    }
                }
            }
        ]
    }
}));
exports.ApiCustomPaginatedResponse = ApiCustomPaginatedResponse;
//# sourceMappingURL=api-paginated-response.decorator.js.map