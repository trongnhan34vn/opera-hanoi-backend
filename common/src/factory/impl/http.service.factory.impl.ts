import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { getInstance } from 'src/config/axios.instance.config';
import { HttpMethod } from 'src/enum/http.method.enum';
import { BadRequestException } from 'src/exception/bad.request.exception';
import { ConflictException } from 'src/exception/confilct.exception';
import { ForbiddenException } from 'src/exception/forbidden.exception';
import { NotFoundException } from 'src/exception/not.found.exception';
import { ServiceUnavailableException } from 'src/exception/service.unavailable.exception';
import { UnauthorizedException } from 'src/exception/unauthorized.exception';
import {
  HttpEndpoint,
  HttpHeaders,
  IHttpServiceFactory,
} from '../http.service.factory.interface';
import { LoggerFactory } from './logger.factory.impl';

@Injectable()
export class HttpServiceFactory implements IHttpServiceFactory {
  constructor(private readonly logger: LoggerFactory) {}
  async delete(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
  ): Promise<AxiosResponse> {
    const endpoint: HttpEndpoint = {
      baseURL,
      path,
    };
    return await this.sendRequest(endpoint, HttpMethod.DELETE, null, headers);
  }

  async get(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
  ): Promise<AxiosResponse> {
    const endpoint: HttpEndpoint = {
      baseURL,
      path,
    };
    return await this.sendRequest(endpoint, HttpMethod.GET, null, headers);
  }

  async post(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse> {
    const endpoint: HttpEndpoint = {
      baseURL,
      path,
    };
    return await this.sendRequest(endpoint, HttpMethod.POST, data, headers);
  }
  async put(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse> {
    const endpoint: HttpEndpoint = {
      baseURL,
      path,
    };
    return await this.sendRequest(endpoint, HttpMethod.PUT, data, headers);
  }
  async patch(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse> {
    const endpoint: HttpEndpoint = {
      baseURL,
      path,
    };
    return await this.sendRequest(endpoint, HttpMethod.PATCH, data, headers);
  }

  private async sendRequest(
    endpoint: HttpEndpoint,
    method: HttpMethod,
    data?: any,
    headers?: HttpHeaders,
  ): Promise<AxiosResponse<any>> {
    const { baseURL, path } = endpoint;

    if (!baseURL || !path) {
      throw new BadRequestException("Base URL or Path can\'t recognized");
    }
    const traceId = this.generateTraceId();

    this.logger.log(
      `[API_CALL:START] ${method} ${baseURL}${path} | Trace-ID: ${traceId}\n` +
        `Headers: ${this.sanitize(headers) ?? 'N/A'}\n` +
        `Data: ${this.sanitize(data) ?? 'N/A'}`,
    );

    let response: AxiosResponse<any> | undefined;

    try {
      switch (method) {
        case HttpMethod.GET:
          response = await getInstance(baseURL, headers).get(path);
          break;
        case HttpMethod.POST:
          response = await getInstance(baseURL, headers).post(path, data);
          break;
        case HttpMethod.PUT:
          response = await getInstance(baseURL, headers).put(path, data);
          break;
        case HttpMethod.PATCH:
          response = await getInstance(baseURL, headers).patch(path, data);
          break;
        case HttpMethod.DELETE:
          response = await getInstance(baseURL, headers).delete(path);
          break;
        default:
          throw new BadRequestException('Invalid method request');
      }
      if (!response) {
        throw new InternalServerErrorException('Server Response error');
      }
      const responseBody = response.data;

      const result = this.sanitize(responseBody);

      this.logger.log(
        `[API_CALL:SUCCESS] ${method} ${baseURL}${path} | Trace-ID: ${traceId}\n` +
          `Status: ${response.status}\n` +
          `Response: ${result ?? 'N/A'}`,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `[API_CALL:ERROR] ${method} ${baseURL}${path} | Trace-ID: ${traceId}\n` +
          `Message: ${error.message}\n` +
          `Code: ${error.code ?? 'N/A'}\n` +
          `Status: ${error.response?.status ?? 'N/A'}\n` +
          `Respones: ${this.sanitize(error.response?.data) ?? 'N/A'}\n` +
          `Stack: ${error.stack}`,
      );
      throw this.handleAxiosError(error);
    } finally {
      this.logger.log(
        `[API_CALL:END] ${method} ${baseURL}${path} | Trace-ID: ${traceId} \n`,
      );
    }
  }

  private generateTraceId() {
    return 'trace-' + Math.random().toString(36).substring(2, 10);
  }

  private sanitize(
    obj: any,
    fieldsToMask: string[] = [
      'authorization',
      'access_token',
      'refresh_token',
      'token',
      'password',
      'apiKey',
    ],
  ): any {
    if (!obj || typeof obj !== 'object') return obj;

    const clone = { ...obj };
    for (const field of fieldsToMask) {
      for (const key in clone) {
        if (key.toLowerCase() === field.toLowerCase()) {
          clone[key] = '***'; // Mask sensitive fields
        }
      }
    }
    return JSON.stringify(clone);
  }

  /**
   * handle axios error
   * @param error
   * @private
   */
  private handleAxiosError(error: AxiosError) {
    const statusError = error.status;

    if (!statusError) {
      if (error.code === 'ECONNREFUSED') {
        throw new ServiceUnavailableException(
          'Service Unavailable',
          'Service Unavailable',
        );
      }

      throw new InternalServerErrorException(
        'Error undefined',
        'Error undefined',
      );
    }

    switch (statusError) {
      case 400:
        throw new BadRequestException(error.message, error.stack);
      case 401:
        throw new UnauthorizedException(error.message, error.stack);
      case 403:
        throw new ForbiddenException(error.message, error.stack);
      case 409:
        throw new ConflictException(error.message, error.stack);
      case 404:
        throw new NotFoundException(error.message, error.stack);
      default:
        throw new InternalServerErrorException(error.message, error.stack);
    }
  }
}
