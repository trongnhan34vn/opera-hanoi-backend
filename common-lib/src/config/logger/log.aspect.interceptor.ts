import {
  Injectable,
  ExecutionContext,
  CallHandler,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerFactory } from './logger.service';

@Injectable()
export class LogAspectInterceptor implements NestInterceptor {
  private readonly logger = new LoggerFactory('log-aspect');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const methodName = handler.name;
    // Kiểm tra xem phương thức có được đánh dấu với @Log() không

    const startTime = Date.now();

    this.logger.log(`Logging started: ${methodName}`);
    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logger.log(`Logging finished: ${methodName} finished in ${duration}ms`);
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        this.logger.error(
          `Logging finished: ${methodName} failed after ${duration}ms with error: ${error.message}`,
        );
        throw error; // Tiếp tục ném lỗi để các handler khác xử lý
      }),
    );
  }
}
