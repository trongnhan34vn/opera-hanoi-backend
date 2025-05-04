import { AxiosResponse } from 'axios';

export interface IHttpServiceFactory {
  get(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
  ): Promise<AxiosResponse>;

  post(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse>;

  put(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse>;

  patch(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
    data?: any,
  ): Promise<AxiosResponse>;

  delete(
    baseURL: string,
    path: string,
    headers: HttpHeaders,
  ): Promise<AxiosResponse>;
}

export interface HttpHeaders {
  token?: string;
  apiKey?: string;
  contentType?: string;
}

export interface HttpEndpoint {
  baseURL: string;
  path: string;
}
