import { SeatCategory } from "src/entity/seat.category";
import { GenericServiceInterface } from "./generic.service.interface";
import { SeatCategoryDto } from "src/dto/request/seat.category.dto";

export interface ISeatCategoryService extends GenericServiceInterface<SeatCategoryDto> {}