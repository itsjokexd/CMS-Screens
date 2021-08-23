import { IsNotEmpty } from "class-validator";

export class UpdateContentDTO{

    @IsNotEmpty()
    name: string;

}