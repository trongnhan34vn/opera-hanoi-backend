import { LoggerService } from '@nestjs/common';
import * as log4js from 'log4js';

export const log4jsConfig = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'coloured',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] - %m',
      },
    },
    file: {
      type: 'file',
      filename: 'logs/app.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%c] - %m',
      },
    },
  },
  categories: {
    default: { appenders: ['out', 'file'], level: 'info' },
    service: { appenders: ['out', 'file'], level: 'info' },
  },
};

log4js.configure(log4jsConfig);

export class LoggerFactory implements LoggerService {
  private logger: log4js.Logger;
  constructor(category: string = 'default') {
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
    this.logger.error(`${message} - Trace: ${trace}`);
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
