import { ISeatCategoryMapper } from "../seat.category.mapper.interface";
import { SeatCategoryDto } from "src/dto/request/seat.category.dto";
import { SeatCategory } from "src/entity/seat.category";
export declare class SeatCategoryMapper implements ISeatCategoryMapper {
    toEntities(dtos: SeatCategoryDto[]): SeatCategory[] | Promise<SeatCategory[]>;
    toDtos(entities: SeatCategory[]): SeatCategoryDto[];
    toDto(entity: SeatCategory): SeatCategoryDto;
    toEntity(dto: SeatCategoryDto): SeatCategory | Promise<SeatCategory>;
}
