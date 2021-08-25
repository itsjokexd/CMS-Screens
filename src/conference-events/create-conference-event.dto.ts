import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateConferenceEventDTO {
    // REVU: можно убрать
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    name: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;
}