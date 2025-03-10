import { HttpMethod } from '../enum/http.method.enum';
import { HttpHeaders, IHttpService } from '../interface/HttpService.interface';
import { LoggerFactory } from '../../config/logger/logger.service';
import { AxiosResponse } from 'axios';
export declare class HttpServiceFactory implements IHttpService {
    private readonly logger;
    constructor(logger: LoggerFactory);
    call<T>(method: HttpMethod, url: string, path: string, headers?: HttpHeaders, data?: any): Promise<AxiosResponse<T>>;
    private handleAxiosError;
}
