import { IsNumber } from "class-validator";

export class UpdatePlaylistsContentDTO{
    
    @IsNumber()
    duration: number;

    @IsNumber()
    order: number;
}