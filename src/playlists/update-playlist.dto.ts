import { IsNotEmpty } from "class-validator";

export class UpdatePlaylistDTO{

    @IsNotEmpty()
    name: string;

}