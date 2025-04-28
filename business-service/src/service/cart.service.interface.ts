import { CartDto } from "src/dto/request/cart.dto";
import { GenericServiceInterface } from "./generic.service.interface";

export interface ICartService extends GenericServiceInterface<CartDto> {}