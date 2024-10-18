import { IsEmail, IsString, Length } from 'class-validator';

export class createUserDto {
  @IsString()
  @Length(3, 15, { groups: ['create'] })
  @Length(6, 20, { groups: ['update'] })
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(6, 20)
  readonly password: string;

  @IsString()
  readonly country: string;
}
