import { ApiResponse } from './ApiResponse.entity';
export declare class SuccessResponse<T> extends ApiResponse {
    data: T;
    constructor(code: string, message: string, data: T);
    get getData(): T;
    set setData(data: T);
}
