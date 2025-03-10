import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  roles?: Set<string>;
}

export class AccountServiceUser extends UserSignUpDto {
  @IsString()
  @IsNotEmpty()
  keycloakId: string;
}
