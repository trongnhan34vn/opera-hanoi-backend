import { HttpMethod } from '../enum/http.method.enum';
import { AxiosResponse } from 'axios';

export interface IHttpService {
  call: (
    method: HttpMethod,
    host: string,
    path: string,
    data?: any,
    headers?: HttpHeaders,
  ) => Promise<AxiosResponse<any>>;
}

export interface HttpHeaders {
  token?: string;
  apiKey?: string;
  contentType?: string;
}
