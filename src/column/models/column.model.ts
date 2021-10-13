import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

export interface ColumnModel extends Base {}

export class ColumnModel extends TimeStamps {
  @prop({ unique: true })
  name: string;

  @prop({ type: () => [Types.ObjectId], default: [] })
  cards?: Types.ObjectId[];
}
