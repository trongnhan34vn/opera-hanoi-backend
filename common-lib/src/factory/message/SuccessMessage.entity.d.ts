import { Message } from './Message.entity';
export declare class SuccessMessage extends Message {
    constructor(code: string, message: string);
    static CREATED: SuccessMessage;
    static OK: SuccessMessage;
    static NO_CONTENT: SuccessMessage;
}
