import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ColumnDto {
  @IsMongoId()
  @IsOptional()
  _id: Types.ObjectId;

  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => Types.ObjectId)
  cards?: Types.ObjectId[];
}

export class UpdateBoardDto {
  @IsString()
  name: string;

  @IsArray()
  @Type(() => Types.ObjectId)
  users: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  @Type(() => ColumnDto)
  columns?: ColumnDto[];
}
