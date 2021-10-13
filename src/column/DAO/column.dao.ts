import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DAOBaseClass } from 'src/utils/entities/DAOBaseClass';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UpdateColumnDto } from '../dto/update-column.dto';
import { ColumnModel } from '../models/column.model';

export class ColumnDao extends DAOBaseClass {
  constructor(
    @InjectModel(ColumnModel)
    private readonly columnModel: ModelType<ColumnModel>,
  ) {
    super();
  }

  async getById(id: string) {
    return this.columnModel.findById(id).exec();
  }

  async getAllColumns(boardId) {
    return this.columnModel.find({ _id: boardId }).exec();
  }

  async createColumn(dto: CreateColumnDto) {
    const newColumn = new this.columnModel(dto);
    return newColumn.save();
  }

  async updateColumnById(id: string, dto: UpdateColumnDto) {
    return this.columnModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteColumnById(id: string) {
    return this.columnModel.findByIdAndDelete(id).exec();
  }
}
