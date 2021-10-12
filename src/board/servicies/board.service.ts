import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/servicies/user.service';
import { BoardDao } from '../DAO/board.dao';
import { CreateBoardDto } from '../dto/create-board.dto';
import { ColumnDto, UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardDao: BoardDao,
    private readonly userService: UserService,
  ) {}

  async findBoardById(id: string) {
    return this.boardDao.getById(id);
  }

  async findAllBoards(auth: string) {
    const user = await this.userService.findUserByToken(auth);
    return this.boardDao.getAllUsersBoards(user._id);
  }

  async createBoard(auth: string, dto: CreateBoardDto) {
    const user = await this.userService.findUserByToken(auth);
    const newBoard = await this.boardDao.createBoard({
      ...dto,
      users: [user._id],
    });
    user.boards.push(newBoard._id);
    await this.userService.updateUserById(user._id.toHexString(), user);
    return newBoard;
  }

  async updateBoardById(id: string, dto: UpdateBoardDto) {
    return this.boardDao.updateBoardById(id, dto);
  }

  async deleteBoardById(id: string, auth: string) {
    const user = await this.userService.findUserByToken(auth);
    const boardIndex = user.boards.indexOf(this.boardDao.toHexObjectId(id));
    if (boardIndex > -1) {
      user.boards.splice(boardIndex, 1);
    }
    await this.userService.updateUserById(user._id.toHexString(), user);
    return this.boardDao.deleteBoardById(id);
  }

  async createColumn(boardId: string, dto: ColumnDto) {
    const board: UpdateBoardDto = await this.findBoardById(boardId);
    const createdColumn = { ...dto, _id: this.boardDao.createNewId() };
    board.columns.push(createdColumn);
    return this.updateBoardById(boardId, board);
  }

  async updateColumnById(boardId: string, columnId: string, dto: ColumnDto) {
    const board = await this.findBoardById(boardId);
    const columnIndex = board.columns.findIndex(
      (item) => item._id.toHexString() === columnId,
    );

    dto.cards.forEach((i) => {
      if (!this.boardDao.isValid(i)) {
        throw new BadRequestException();
      }
    });

    board.columns[columnIndex] = {
      name: dto.name,
      _id: board.columns[columnIndex]._id,
      cards: [...board.columns[columnIndex].cards, ...dto.cards],
    };

    return this.updateBoardById(boardId, board);
  }

  async deleteColumnById(boardId: string, columnId: string) {
    const board: UpdateBoardDto = await this.findBoardById(boardId);
    const columnIndex = board.columns.findIndex((column) => {
      return column._id.toHexString() === columnId;
    });
    if (columnIndex > -1) {
      board.columns.splice(columnIndex, 1);
    }
    return this.updateBoardById(boardId, board);
  }
}
