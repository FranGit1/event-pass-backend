import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { HttpResponse } from '../http/http-response';

export const ApiCustomResponse = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(HttpResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(HttpResponse) },
          {
            properties: {
              payload: {
                $ref: getSchemaPath(dataDto)
              }
            }
          }
        ]
      }
    })
  );
