import { User } from "src/entity/user.entity";
import { IGenericRepository } from "./generic.repository.interface";

export interface IUserRepository extends IGenericRepository<User> {
    findByEmail(email: string): Promise<User>
    findByPhone(phone: string): Promise<User>
}