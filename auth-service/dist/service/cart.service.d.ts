import { HttpServiceFactory, LoggerFactory } from 'common';
export declare class CartService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpServiceFactory, logger: LoggerFactory);
    createCart(userId: string): Promise<void>;
}
