export declare class HttpResponse<T> {
    payload?: T;
    code: number;
    message: string;
    isSuccessful: boolean;
}
export declare class HttpPaginatedResponse<T> {
    payload?: PaginatedPayload<T>;
    code: number;
    message: string;
    isSuccessful: boolean;
}
export declare class PaginatedPayload<T> {
    items: T[];
    itemsPerPage: number;
    totalPages: number;
    totalItems: number;
    currentPage: number;
}
