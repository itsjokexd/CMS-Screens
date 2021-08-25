import { IsDateString, IsNotEmpty } from "class-validator";

export class UpdateConferenceEventDTO {
    // REVU: Сделать поля поля опциональными
    @IsNotEmpty()
    name: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;
}