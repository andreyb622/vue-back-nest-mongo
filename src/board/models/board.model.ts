import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

class Column {
  @prop({ type: () => Types.ObjectId })
  _id: Types.ObjectId;

  @prop()
  name: string;

  @prop({ type: () => [Types.ObjectId] })
  cards?: Types.ObjectId[];
}

export interface BoardModel extends Base {}

export class BoardModel extends TimeStamps {
  @prop({ unique: true })
  name: string;

  @prop({ type: () => [Types.ObjectId] })
  users: Types.ObjectId[];

  @prop({ type: () => [Column], default: [] })
  columns?: Column[];
}
