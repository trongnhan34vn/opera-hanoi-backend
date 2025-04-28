export class PaginationResponse<T> {
    items: number
    pages: number
    currentPage: number
    data: T[]

    constructor(items: number,  pages: number, currentPage: any, data: T[]) {
        this.items = items;
        this.pages = pages;
        this.currentPage = currentPage;
        this.data = data
    }
}