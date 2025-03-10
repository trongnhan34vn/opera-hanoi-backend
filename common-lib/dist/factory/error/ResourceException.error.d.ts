export declare class ResourceException extends Error {
    errorCode: string;
    details?: string;
    constructor(errorCode: string, message: string, details?: string);
    toJson(): {
        errorCode: string;
        message: string;
    };
    get getErrorCode(): string;
    get getDetails(): string;
}
