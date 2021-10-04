import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  role: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  boards?: Types.ObjectId[];
}
