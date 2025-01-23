import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
