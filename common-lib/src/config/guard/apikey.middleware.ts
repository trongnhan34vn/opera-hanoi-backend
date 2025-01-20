import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ResourceError } from '../../factory/error/ResourceError.error';
import { ErrorMessage } from '../../factory/message/ErrorMessage.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const API_KEY_HEADER = 'x-api-key';
    // Lấy API key từ header
    const apiKey = req.headers[API_KEY_HEADER];
    const validApiKey = this.configService.get<string>('API_KEY');
    // check valid api key
    const isValidApiKey = !apiKey || apiKey !== validApiKey;
    console.log('req-api-key', apiKey);
    console.log('valid-api-key', validApiKey);
    if (isValidApiKey) {
      // Nếu không có API key hoặc sai API key
      throw new ResourceError(
        ErrorMessage.UNAUTHORIZED.getCode,
        'Unauthorized',
      );
    }

    // Nếu API key hợp lệ, tiếp tục với middleware tiếp theo
    next();
  }
}
