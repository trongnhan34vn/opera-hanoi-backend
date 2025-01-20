import { Message } from './Message.entity';

export class SuccessMessage extends Message {
  constructor(code: string, message: string) {
    super(code, message);
  }

  static CREATED = new SuccessMessage('SUC201', 'Resource created');
  static OK = new SuccessMessage('SUC200', 'OK');
  static NO_CONTENT = new SuccessMessage('SUC204', 'No Content');
}
