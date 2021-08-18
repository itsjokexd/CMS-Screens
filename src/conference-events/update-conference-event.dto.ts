import { IsDateString, IsNotEmpty } from "class-validator";

export class UpdateConferenceEventDTO {

    @IsNotEmpty()
    name: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;
}