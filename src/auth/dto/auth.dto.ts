import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be leest 6 cheracters long' })
  @IsString()
  password: string;
}
