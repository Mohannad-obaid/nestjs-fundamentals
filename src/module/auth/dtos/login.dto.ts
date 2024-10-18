import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
