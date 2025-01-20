import { ApiResponse } from './ApiResponse.entity';
export declare class ErrorResponse extends ApiResponse {
    constructor(code: string, message: string, details: string);
    private details;
    get getDetails(): string;
    set setDetails(details: string);
}
