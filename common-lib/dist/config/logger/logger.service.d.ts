import { LoggerService } from '@nestjs/common';
export declare class LoggerFactory implements LoggerService {
    private logger;
    constructor(category?: string);
    log(message: any): void;
    error(message: any, trace?: string): void;
    warn(message: any): void;
    debug(message: any): void;
    verbose(message: any): void;
}
