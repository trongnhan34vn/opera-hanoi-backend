import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class AdminAccountCreateDto {
  @IsString()
  email: string;
  @IsArray()
  @ArrayNotEmpty({ message: 'Field [roles] must not be empty' })
  roles: Set<string>;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
