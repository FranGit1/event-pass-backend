import { ApiProperty } from '@nestjs/swagger';

export class HttpResponse<T> {
  payload?: T;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isSuccessful: boolean;
}

export class HttpPaginatedResponse<T> {
  payload?: PaginatedPayload<T>;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  isSuccessful: boolean;
}

export class PaginatedPayload<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  currentPage: number;
}
