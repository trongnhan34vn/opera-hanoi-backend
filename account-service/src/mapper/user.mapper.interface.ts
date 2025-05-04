import { UserDto } from "src/dto/request/user.dto";
import { GenericMapper } from "./generic.mapper.interface";
import { User } from "src/entity/user.entity";

export interface IUserMapper extends GenericMapper<User, UserDto>{}