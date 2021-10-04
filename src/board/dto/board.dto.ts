import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class BoardDto {
  @IsString()
  name: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  users: Types.ObjectId[];
}
