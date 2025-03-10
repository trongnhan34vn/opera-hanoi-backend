import { LoggerService, OnModuleInit } from '@nestjs/common';
export interface ConsulOptions {
    host: string;
    port: number;
    service: {
        id: string;
        name: string;
        host: string;
        port: number;
        healthCheckPath: string;
        interval?: string;
        timeout?: string;
    };
}
export declare class ConsulService implements OnModuleInit {
    private readonly logger;
    private consul;
    private options;
    constructor(logger: LoggerService, options: ConsulOptions);
    onModuleInit(): Promise<void>;
    private registerService;
    private deregisterService;
}
