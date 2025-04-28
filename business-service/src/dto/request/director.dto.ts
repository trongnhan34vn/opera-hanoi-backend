import { IsOptional, IsString } from "class-validator";

export class DirectorDto {
    @IsOptional()
    @IsString()
    id?: string;
    
    @IsString()
    name: string
}