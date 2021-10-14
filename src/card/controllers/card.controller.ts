import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CardService } from '../servicies/card.service';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CreateCardDto } from '../dto/create-card.dto';

@UseGuards(JwtAuthGuard)
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.cardService.findCardById(id);
  }

  @Get('/')
  async getAll(@Query('columnId') columnId: string) {
    return this.cardService.findAllCards(columnId);
  }

  @Post('/')
  async create(@Body() dto: CreateCardDto) {
    return this.cardService.createCard(dto);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: UpdateCardDto) {
    return this.cardService.updateCardById(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.cardService.deleteCardById(id);
  }
}
