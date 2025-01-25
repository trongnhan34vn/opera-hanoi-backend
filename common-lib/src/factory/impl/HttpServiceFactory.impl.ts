import { HttpMethod } from '../enum/http.method.enum';
import { HttpHeaders, IHttpService } from '../interface/HttpService.interface';
import { getInstance } from '../../config/axios/instance.config';
import { Injectable } from '@nestjs/common';
import { LoggerFactory } from '../../config/logger/logger.service';
import { ResourceException } from '../error/ResourceException.error';
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
   * @param url
   * @param path
   * @param headers
   * @param data
   */
  async call<T>(
    method: HttpMethod,
    url: string,
    path: string,
    headers?: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse<T>> {
    this.logger.log(`Start call api...`);
    this.logger.log(
      `url: [${url}];
      path: [${path}];
      method: [${method}];
      headers:[${headers}];
      data: [${data}];`,
    );
    try {
      let response: AxiosResponse;
      switch (method) {
        case HttpMethod.GET:
          // GET method
          response = await getInstance(url, headers).get(path);
          break;
        case HttpMethod.PATCH:
          // PATCH method
          response = await getInstance(url, headers).patch(path, data);
          break;
        case HttpMethod.POST:
          // POST method
          response = await getInstance(url, headers).post(path, data);
          break;
        case HttpMethod.PUT:
          // PUT method
          response = await getInstance(url, headers).put(path, data);
          break;
        case HttpMethod.DELETE:
          // DELETE method
          response = await getInstance(url, headers).delete(path);
          break;
        default:
          throw new ResourceException(
            ErrorMessage.BAD_REQUEST.getCode,
            'Method is invalid',
          );
      }
      this.logger.log('Call API successfully.');
      return response;
    } catch (e) {
      const error: AxiosError = e;
      this.logger.error(
        `Error occurred when calling API. ${error}. Response: ${JSON.stringify(error.response.data)}.`,
      );
      this.handleAxiosError(error);
      // General error
      throw new ResourceException(
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
        throw new ResourceException(
          ErrorMessage.BAD_REQUEST.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
      case 401:
        throw new ResourceException(
          ErrorMessage.UNAUTHORIZED.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
      case 403:
        throw new ResourceException(
          ErrorMessage.FORBIDDEN.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
      case 409:
        throw new ResourceException(
          ErrorMessage.CONFLICT.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
      case 404:
        throw new ResourceException(
          ErrorMessage.NOT_FOUND.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
      default:
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          error.message,
          JSON.stringify(error.response.data),
        );
    }
  }
}
