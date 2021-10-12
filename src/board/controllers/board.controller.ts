import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BoardService } from '../servicies/board.service';
import { ColumnDto, UpdateBoardDto } from '../dto/update-board.dto';
import { CreateBoardDto } from '../dto/create-board.dto';

@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.boardService.findBoardById(id);
  }

  @Get('/')
  async getAll(@Headers('Authorization') auth: string) {
    return this.boardService.findAllBoards(auth);
  }

  @Post('/')
  async create(
    @Body() dto: CreateBoardDto,
    @Headers('Authorization') auth: string,
  ) {
    return this.boardService.createBoard(auth, dto);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateBoardDto) {
    return this.boardService.updateBoardById(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    return this.boardService.deleteBoardById(id, auth);
  }

  @Post(':id/column')
  async createColumn(@Param('id') id: string, @Body() dto: ColumnDto) {
    return this.boardService.createColumn(id, dto);
  }

  @Patch(':id/column/:columnId')
  async updateColumn(
    @Param('id') id: string,
    @Param('columnId') columnId: string,
    @Body() dto: ColumnDto,
  ) {
    return this.boardService.updateColumnById(id, columnId, dto);
  }

  @Delete(':id/column/:columnId')
  async deleteColumn(
    @Param('id') id: string,
    @Param('columnId') columnId: string,
  ) {
    return this.boardService.deleteColumnById(id, columnId);
  }
}
