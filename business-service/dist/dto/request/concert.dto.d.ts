import { ShowtimeDto } from './showtime.dto';
export declare class ConcertDto {
    id: string;
    code: string;
    artists: string[];
    directors: string[];
    title: string;
    description: string;
    genres: string[];
    images: string[];
    showTimes: ShowtimeDto[];
    prices: PriceDto[];
}
export type PriceDto = {
    seatCategoryId: string;
    price: number;
};
