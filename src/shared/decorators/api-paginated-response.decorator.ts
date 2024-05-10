import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { HttpResponse, PaginatedPayload } from '../http/http-response';

export const ApiCustomPaginatedResponse = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(HttpResponse, PaginatedPayload, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              payload: {
                type: 'object',
                allOf: [{ $ref: getSchemaPath(PaginatedPayload) }],
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(dataDto) }
                  }
                }
              }
            }
          }
        ]
      }
    })
  );
