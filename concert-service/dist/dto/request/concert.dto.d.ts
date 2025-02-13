import { ShowtimeDto } from './showtime.dto';
type SeatCategoriesPrice = {
    seatCategoryId: string;
    price: number;
};
export declare class ConcertDto {
    id: string;
    art: string;
    director: string;
    title: string;
    description: string;
    categories: string[];
    images: string[];
    showTimes: ShowtimeDto[];
    seatCategoriesPrice: SeatCategoriesPrice[];
}
export {};
