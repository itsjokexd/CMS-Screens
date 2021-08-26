import { IsNumber, IsOptional } from "class-validator";

export class UpdatePlaylistsContentDTO{
    
    @IsOptional()
    @IsNumber()
    duration: number;

    @IsOptional()
    @IsNumber()
    order: number;
}