import { HttpMethod } from '../enum/http.method.enum';
import { AxiosResponse } from 'axios';

export interface IHttpService {
  call: (
    endpoint: HttpEndpoint,
    method: HttpMethod,
    data?: any,
    headers?: HttpHeaders,
  ) => Promise<AxiosResponse<any>>;
}

export interface HttpHeaders {
  token?: string;
  apiKey?: string;
  contentType?: string;
}

export interface HttpEndpoint {
    baseURL: string,
    path: string,
}
