import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePlaylistDTO {
    
    @IsNumber()
    conferenceScreenId: number;

    @IsNotEmpty()
    name: string;

}