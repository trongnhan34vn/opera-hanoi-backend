import { Injectable } from "@nestjs/common";
import { ISeatCategoryMapper } from "../seat.category.mapper.interface";
import { SeatCategoryDto } from "src/dto/request/seat.category.dto";
import { SeatCategory } from "src/entity/seat.category";

@Injectable()
export class SeatCategoryMapper implements ISeatCategoryMapper {
    toEntities(dtos: SeatCategoryDto[]): SeatCategory[] | Promise<SeatCategory[]> {
        throw new Error("Method not implemented.");
    }
    
    toDtos(entities: SeatCategory[]): SeatCategoryDto[] {
        const dtos: SeatCategoryDto[] = [];
        for (const entity of entities) {
            const dto = this.toDto(entity);
            dtos.push(dto);
        }
        return dtos;
    }


    toDto(entity: SeatCategory): SeatCategoryDto {
        const seatCategoryDto = new SeatCategoryDto();
        seatCategoryDto.id = entity.id;
        seatCategoryDto.name = entity.name;
        return seatCategoryDto;
    }
    toEntity(dto: SeatCategoryDto): SeatCategory | Promise<SeatCategory> {
        throw new Error("Method not implemented.");
    }

    

}