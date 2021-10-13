import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateColumnDto {
  @IsString()
  name: string;

  @IsString()
  boardId?: string;
}
