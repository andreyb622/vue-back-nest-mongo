import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateColumnDto {
  @IsString()
  name: string;

  @IsMongoId()
  boardId: Types.ObjectId;
}
