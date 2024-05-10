import { HttpStatus } from '@nestjs/common';
import { HttpPaginatedResponse, HttpResponse, PaginatedPayload } from './http-response';

export const createHttpResponse = <T>(
  code: HttpStatus,
  message: string,
  payload?: T,
  isSuccessful: boolean = code >= 200 && code <= 299
): HttpResponse<T> => {
  return { code, message, payload, isSuccessful };
};

export const createHttpPaginatedResponse = <T>(
  code: HttpStatus,
  message: string,
  payload?: PaginatedPayload<T>,
  isSuccessful: boolean = code >= 200 && code <= 299
): HttpPaginatedResponse<T> => {
  return { code, message, payload, isSuccessful };
};
