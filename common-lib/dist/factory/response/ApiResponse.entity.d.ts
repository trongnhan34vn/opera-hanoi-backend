export declare class ApiResponse {
    private code;
    private message;
    private timestamp;
    constructor(code: string, message: string);
    get getCode(): string;
    get getMessage(): string;
    set setCode(code: string);
    set setMessage(message: string);
}
