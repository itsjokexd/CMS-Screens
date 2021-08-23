import { IsNumber } from "class-validator";

export class CreatePlaylistsContentDTO {
    
    @IsNumber()
    playlistId: number;

    @IsNumber()
    contentId: number;
    
    @IsNumber()
    duration: number;

    @IsNumber()
    order: number;

}