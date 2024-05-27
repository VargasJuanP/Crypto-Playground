import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNetworkDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name: string;

}