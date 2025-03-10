import { Message } from './Message.entity';
export declare class ErrorMessage extends Message {
    static NOT_FOUND: ErrorMessage;
    static INTERNAL_SERVER_ERROR: ErrorMessage;
    static BAD_REQUEST: ErrorMessage;
    static CONFLICT: ErrorMessage;
    static UNAUTHORIZED: ErrorMessage;
    static FORBIDDEN: ErrorMessage;
    static SERVICE_UNAVAILABLE: ErrorMessage;
    static getMessageByStatus(status: number): ErrorMessage;
}
