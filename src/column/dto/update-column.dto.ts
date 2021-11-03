import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateColumnDto {
  @IsString()
  name: string;

  @IsMongoId()
  boardId: Types.ObjectId;
}
