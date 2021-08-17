import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUsersDTO {
    
    @IsNotEmpty()
    @IsEmail()
    @MinLength(6)
    @MaxLength(15)
    username: string;
    
    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    password: string;
}