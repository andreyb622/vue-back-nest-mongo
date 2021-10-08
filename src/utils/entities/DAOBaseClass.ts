import { Types } from 'mongoose';

export class DAOBaseClass {
  toHexObjectId(id: string) {
    return new Types.ObjectId(id);
  }
}
