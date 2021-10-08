import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateBoardDto {
  @IsString()
  name: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  users: Types.ObjectId[];
}
