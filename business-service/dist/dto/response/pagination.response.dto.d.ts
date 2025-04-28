export declare class PaginationResponse<T> {
    items: number;
    pages: number;
    currentPage: number;
    data: T[];
    constructor(items: number, pages: number, currentPage: any, data: T[]);
}
