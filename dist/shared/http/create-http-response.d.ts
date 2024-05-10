import { HttpStatus } from '@nestjs/common';
import { HttpPaginatedResponse, HttpResponse, PaginatedPayload } from './http-response';
export declare const createHttpResponse: <T>(code: HttpStatus, message: string, payload?: T, isSuccessful?: boolean) => HttpResponse<T>;
export declare const createHttpPaginatedResponse: <T>(code: HttpStatus, message: string, payload?: PaginatedPayload<T>, isSuccessful?: boolean) => HttpPaginatedResponse<T>;
