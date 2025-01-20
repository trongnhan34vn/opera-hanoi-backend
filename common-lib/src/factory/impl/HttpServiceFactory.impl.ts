import { HttpMethod } from '../enum/http.method.enum';
import { HttpHeaders, IHttpService } from '../interface/HttpService.interface';
import { getInstance } from '../../config/axios/instance.config';
import { Injectable } from '@nestjs/common';
import { LoggerFactory } from '../../config/logger/logger.service';
import { ResourceError } from '../error/ResourceError.error';
import { ErrorMessage } from '../message/ErrorMessage.entity';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class HttpServiceFactory implements IHttpService {
  constructor(
    private readonly logger: LoggerFactory = new LoggerFactory('common'),
  ) {}

  /**
   * Call API common
   * @param method
   * @param host
   * @param path
   * @param data
   * @param headers
   */
  async call(
    method: HttpMethod,
    host: string,
    path: string,
    data?: any,
    headers?: HttpHeaders,
  ): Promise<AxiosResponse<any>> {
    this.logger.log(`Start call api...`);
    this.logger.log(
      `host: [${host}];
      path: [${path}];
      method: [${method}];
      data: [${data}];
      headers:[${headers}]`,
    );
    try {
      let response: AxiosResponse;
      switch (method) {
        case HttpMethod.GET:
          // get method
          response = await getInstance(host, headers).get(path);
          break;
        case HttpMethod.PATCH:
          // patch method
          response = await getInstance(host, headers).patch(path, data);
          break;
        case HttpMethod.POST:
          // post method
          response = await getInstance(host, headers).post(path, data);
          break;
        case HttpMethod.PUT:
          // post method
          response = await getInstance(host, headers).put(path, data);
          break;
        default:
          throw new ResourceError(
            ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
            'Method is invalid',
          );
      }
      this.logger.log('Call API successfully.');
      return response;
    } catch (e) {
      const error: AxiosError = e;
      this.logger.error(
        `Error occurred when calling API. ${error}. Cause: ${error.cause}. Response: ${JSON.stringify(error.response.data)}.`,
      );
      this.handleAxiosError(error);
      // General error
      throw new ResourceError(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
        'Unexpected error occurred',
      );
    } finally {
      this.logger.log(`End call api.`);
    }
  }

  /**
   * handle axios error
   * @param error
   * @private
   */
  private handleAxiosError(error: AxiosError) {
    const statusError = error.status;
    switch (statusError) {
      case 400:
        throw new ResourceError(
          ErrorMessage.BAD_REQUEST.getCode,
          error.message,
        );
      case 401:
        throw new ResourceError(
          ErrorMessage.UNAUTHORIZED.getCode,
          error.message,
        );
      case 403:
        throw new ResourceError(ErrorMessage.FORBIDDEN.getCode, error.message);
      case 409:
        throw new ResourceError(ErrorMessage.CONFLICT.getCode, error.message);
      case 404:
        throw new ResourceError(ErrorMessage.NOT_FOUND.getCode, error.message);
    }
  }
}
