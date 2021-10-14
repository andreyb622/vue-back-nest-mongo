import { Injectable } from '@nestjs/common';
import { ColumnService } from 'src/column/servicies/column.service';
import { CardDao } from '../DAO/card.dao';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    private readonly cardDao: CardDao,
    private readonly columnService: ColumnService,
  ) {}

  async findCardById(id: string) {
    return this.cardDao.getById(id);
  }

  async findAllCards(columnId: string) {
    const column = await this.columnService.findColumnById(columnId);
    return this.cardDao.getAllCards(column._id);
  }

  async createCard({ columnId, name }: CreateCardDto) {
    const newCard = await this.cardDao.createCard({
      name,
      columnId,
    });
    return newCard;
  }

  async updateCardById(id: string, dto: UpdateCardDto) {
    return this.cardDao.updateCardById(id, dto);
  }

  async deleteCardById(id: string) {
    return this.cardDao.deleteCardById(id);
  }
}
