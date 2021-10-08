import { Type } from 'class-transformer';
import { IsArray, IsEmail } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  boards?: Types.ObjectId[];
}
