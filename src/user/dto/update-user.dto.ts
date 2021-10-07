import { IsArray, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsArray()
  boards?: string[];
}
