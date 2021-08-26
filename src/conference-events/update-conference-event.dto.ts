import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateConferenceEventDTO {

    @IsOptional()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsDateString()
    start_date: Date;

    @IsOptional()
    @IsDateString()
    end_date: Date;
}