import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardService } from 'src/board/servicies/board.service';
import { ColumnDao } from '../DAO/column.dao';
import { CreateColumnDto } from '../dto/create-column.dto';
import { UpdateColumnDto } from '../dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnDao: ColumnDao,
    private readonly boardService: BoardService,
  ) {}

  async findColumnById(id: string) {
    return this.columnDao.getById(id);
  }

  async findAllColumns(boardId: string) {
    const board = await this.boardService.findBoardById(boardId);
    return this.columnDao.getAllColumns(board._id);
  }

  async createColumn({ boardId, name }: CreateColumnDto) {
    const board = await this.boardService.findBoardById(boardId);
    const newColumn = await this.columnDao.createColumn({
      name: name,
    });
    board.columns.push(newColumn._id);
    await this.boardService.updateBoardById(board._id.toHexString(), board);
    return newColumn;
  }

  async updateColumnById(id: string, dto: UpdateColumnDto) {
    return this.columnDao.updateColumnById(id, dto);
  }

  async deleteColumnById(id: string, boardId: string) {
    const board = await this.boardService.findBoardById(boardId);
    const ColumnIndex = board.columns.indexOf(this.columnDao.toHexObjectId(id));
    if (ColumnIndex > -1) {
      board.columns.splice(ColumnIndex, 1);
    }
    await this.boardService.updateBoardById(board._id.toHexString(), board);
    return this.columnDao.deleteColumnById(id);
  }
}
