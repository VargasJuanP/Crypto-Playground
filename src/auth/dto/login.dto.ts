import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength} from "class-validator";

export class LoginDto {

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @MaxLength(20)
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    username: string;

}