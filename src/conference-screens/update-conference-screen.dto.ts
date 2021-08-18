import { IsNotEmpty } from "class-validator";

export class UpdateConferenceScreenDTO{

    @IsNotEmpty()
    name: string;

}