import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsAdult } from './user.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  @IsAdult({ message: 'For registration, you  must be above 18' })
  birthDay: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
