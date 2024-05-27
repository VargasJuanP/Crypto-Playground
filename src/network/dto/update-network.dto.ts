import { IsNotEmpty, IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateNetworkDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsObject()
    doc: any;

}
