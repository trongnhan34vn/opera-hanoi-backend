import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
