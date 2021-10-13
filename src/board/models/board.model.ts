import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export interface BoardModel extends Base {}

export class BoardModel extends TimeStamps {
  @prop({ unique: true })
  name: string;

  @prop({ type: () => [Types.ObjectId] })
  users: Types.ObjectId[];

  @prop({ type: () => [Types.ObjectId], default: [] })
  columns?: Types.ObjectId[];
}
