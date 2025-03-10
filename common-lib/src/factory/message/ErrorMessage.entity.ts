import { Message } from './Message.entity';

export class ErrorMessage extends Message {
  static NOT_FOUND = new ErrorMessage('ERR404', '404 Resource not found');
  static INTERNAL_SERVER_ERROR = new ErrorMessage(
    'ERR500',
    '500 Internal Server Error',
  );
  static BAD_REQUEST = new ErrorMessage('ERR400', '400 Bad Request');
  static CONFLICT = new ErrorMessage('ERR409', '409 Conflict');
  static UNAUTHORIZED = new ErrorMessage('ERR401', '401 Unauthorized');
  static FORBIDDEN = new ErrorMessage('ERR403', '403 Forbidden');
  static SERVICE_UNAVAILABLE = new ErrorMessage(
    'ERR503',
    '503 Service Unavailable',
  );

  static getMessageByStatus(status: number) {
    switch (status) {
      case 503:
        return this.SERVICE_UNAVAILABLE;
      case 404:
        return this.NOT_FOUND;
      case 500:
        return this.INTERNAL_SERVER_ERROR;
      case 400:
        return this.BAD_REQUEST;
      case 409:
        return this.CONFLICT;
      case 401:
        return this.UNAUTHORIZED;
      case 403:
        return this.FORBIDDEN;
    }
  }
}
