import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateConferenceEventDTO {
    
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    name: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;
}