import axios from 'axios';
import { HttpHeaders } from '../../factory/interface/HttpService.interface';

export const getInstance = (host: string, headers?: HttpHeaders) => {
  const { token, apiKey, contentType } = headers;
  return axios.create({
    baseURL: host,
    headers: headers
      ? {
          Authorization: token ? token : '',
          'X-API-KEY': apiKey ? apiKey : '',
          'Content-Type': contentType ? contentType : '',
        }
      : null,
  });
};
