import axios from 'axios';
import { HttpContentType } from 'src/enum/http.content.enum';
import { HttpHeaders } from 'src/factory/http.service.factory.interface';

export const getInstance = (baseURL: string, headers?: HttpHeaders) => {
  if (!headers) {
    return axios.create({
      baseURL: baseURL,
    });
  }

  const { token, apiKey, contentType } = headers;
  return axios.create({
    baseURL: baseURL,
    headers: headers
      ? {
          Authorization: token ? token : '',
          'x-api-key': apiKey ? apiKey : '',
          'Content-Type': contentType ? contentType : HttpContentType.JSON,
        }
      : undefined,
  });
};
