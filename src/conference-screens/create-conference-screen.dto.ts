import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateConferenceScreenDTO {
    @IsNumber()
    conferenceEventId: number;

    @IsNotEmpty()
    name: string;
}