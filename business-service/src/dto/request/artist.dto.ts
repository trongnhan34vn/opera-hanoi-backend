import { IsOptional, IsString } from "class-validator";
export class ArtistDto {
    @IsOptional()
    @IsString()
    id?: string;
    
    @IsString()
    name: string
}