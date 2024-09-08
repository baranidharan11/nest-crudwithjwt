import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  mobile: string;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @Transform(({ value }) => value && new Date(value))
  date_of_birth: Date;
}
