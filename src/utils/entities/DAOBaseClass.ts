import { Types } from 'mongoose';

export class DAOBaseClass {
  toHexObjectId(id: string) {
    return new Types.ObjectId(id);
  }

  createNewId() {
    return new Types.ObjectId();
  }

  isValid(id) {
    return Types.ObjectId.isValid(id);
  }
}
