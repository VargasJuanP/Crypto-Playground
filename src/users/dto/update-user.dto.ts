import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MaxLength(20)
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  username: string;
}
