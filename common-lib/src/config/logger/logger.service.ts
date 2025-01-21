// src/common/log4js-logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as log4js from 'log4js';
import { log4jsConfig } from './log4js.config';

// Cấu hình log4js
log4js.configure(log4jsConfig);

@Injectable()
export class LoggerFactory implements LoggerService {
  private logger: log4js.Logger;

  constructor(category: string = 'default') {
    // Khởi tạo logger với category và level cấu hình
    this.logger = log4js.getLogger(category);
  }

  log(message: any) {
    this.logger.info(message);
  }

  error(message: any, trace?: string) {
    if (!trace) {
      this.logger.error(`${message}`);
      return;
    }
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }

  verbose(message: any) {
    this.logger.trace(message);
  }
}
