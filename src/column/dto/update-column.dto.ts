import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateColumnDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => Types.ObjectId)
  cards?: Types.ObjectId[];
}
