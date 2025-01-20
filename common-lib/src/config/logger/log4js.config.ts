export const log4jsConfig = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'coloured',
        pattern: '[%d{yyyy-MM-dd HH:mm:ss}] [%p] [%c] - %m',
      },
    },
    file: {
      type: 'file',
      filename: 'logs/app.log',
      layout: {
        type: 'basic',
        pattern: '[%d{yyyy-MM-dd HH:mm:ss}] [%p] [%c] - %m',
      },
    },
  },
  categories: {
    default: { appenders: ['out', 'file'], level: 'info' },
    service: { appenders: ['out', 'file'], level: 'info' },
  },
};
