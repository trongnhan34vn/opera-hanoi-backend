import { Model } from "sequelize-typescript";
import { Concert } from "./concert.entity";
export declare class Artist extends Model<Artist> {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    concert: Concert;
    concertId: string;
}
