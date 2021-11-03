import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBoardDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => Types.ObjectId)
  users?: Types.ObjectId[];
}
