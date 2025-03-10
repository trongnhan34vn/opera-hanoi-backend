import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id?: string;
    email: string;
    phone: string;
    isActive: boolean;
    address?: string;
    birthDate?: Date;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
}
