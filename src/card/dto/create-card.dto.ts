import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsMongoId()
  columnId: Types.ObjectId;
}
