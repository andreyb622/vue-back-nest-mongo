import { mongoose } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { connections, mongo, Mongoose } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { DAOBaseClass } from 'src/utils/entities/DAOBaseClass';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardModel } from '../models/board.model';

export class BoardDao extends DAOBaseClass {
  constructor(
    @InjectModel(BoardModel) private readonly boardModel: ModelType<BoardModel>,
  ) {
    super();
  }

  async getById(id: string) {
    const response = await this.boardModel
      .aggregate([
        { $match: { _id: this.toHexObjectId(id) } },
        {
          $lookup: {
            from: 'column',
            localField: '_id',
            foreignField: 'boardId',
            as: 'columns',
          },
        },
        {
          $unwind: { path: '$columns' },
        },
        {
          $lookup: {
            from: 'card',
            localField: 'columns._id',
            foreignField: 'columnId',
            as: 'columns.cards',
          },
        },
      ])
      .exec();

    const board = { ...response[0] };
    board.columns = [];
    response.forEach((i) => {
      board.columns.push(i.columns);
    });
    return board;
  }

  async getAllUsersBoards(userId) {
    return this.boardModel.find({ users: userId }).exec();
  }

  async createBoard(dto: CreateBoardDto) {
    const newBoard = new this.boardModel(dto);
    return newBoard.save();
  }

  async updateBoardById(id: string, dto: UpdateBoardDto) {
    return this.boardModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteBoardById(id: string) {
    return this.boardModel.findByIdAndDelete(id).exec();
  }
}
