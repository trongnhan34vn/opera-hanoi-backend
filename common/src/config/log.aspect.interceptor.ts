import {
  Injectable,
  ExecutionContext,
  CallHandler,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ResourceException } from 'src/exception';
import { LoggerFactory } from 'src/factory/impl/logger.factory.impl';

@Injectable()
export class LogAspectInterceptor implements NestInterceptor {
  private readonly logger = new LoggerFactory('log-aspect');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const methodName = handler.name;
    // Kiểm tra xem phương thức có được đánh dấu với @Log() không
    const controller = context.getClass().name;
    const startTime = Date.now();

    this.logger.log(`Logging started: [${controller}] ${methodName}`);
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `Logging success: [${controller}] ${methodName} executed successfully`,
        );
      }),
      catchError((error) => {
        if (error.response) {
          this.logger.error(
            `Logging error: [${controller}] ${methodName} failed with error: ${error.response.message} - ${error.stack}.`,
          );
        } else {
          this.logger.error(
            `Logging error: [${controller}] ${methodName} failed with error: ${error.name} - ${error.stack}.`,
          );
        }

        throw error;
      }),
      finalize(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logger.log(
          `Logging ended: [${controller}] ${methodName} ended after ${duration}ms`,
        );
      }),
    );
  }
}
