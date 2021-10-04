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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UsePipes(new ValidationPipe())
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.boardService.findBoard(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll() {
    return this.boardService.findAllBoards();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/')
  async create(@Body() dto: BoardDto, @Headers('Authorization') auth: string) {
    return this.boardService.createBoard(auth, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: BoardDto) {
    const updateBoard = await this.boardService.updateBoardById(id, dto);
    return updateBoard;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    return this.boardService.deleteBoardById(id, auth);
  }
}
