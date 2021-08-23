import { IsNotEmpty, IsNumber } from "class-validator";
import { ContentType } from "src/common/enums/content-type.enum";

export class CreateContentDTO {

    @IsNumber()
    userId: number;
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: ContentType;

}