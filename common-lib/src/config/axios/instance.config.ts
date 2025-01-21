import axios from 'axios';
import { HttpHeaders } from '../../factory/interface/HttpService.interface';
import { HttpContentType } from '../../factory/enum/http.content.type';

export const getInstance = (host: string, headers?: HttpHeaders) => {
  const { token, apiKey, contentType } = headers;
  return axios.create({
    baseURL: host,
    headers: headers
      ? {
          Authorization: token ? token : '',
          'x-api-key': apiKey ? apiKey : '',
          'Content-Type': contentType ? contentType : HttpContentType.JSON,
        }
      : null,
  });
};
