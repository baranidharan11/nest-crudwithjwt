import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsString()
  name?: string;
  @IsString()
  email?: string;
  @IsString()
  password?: string;
  @IsString()
  mobile?: string;
  @IsString()
  gender?: string;
  @Transform(({ value }) => value && new Date(value))
  date_of_birth?: Date;
}
