import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface CardModel extends Base {}

export class CardModel extends TimeStamps {
  @prop({ unique: true })
  name: string;

  @prop()
  columnId: Types.ObjectId;
}
