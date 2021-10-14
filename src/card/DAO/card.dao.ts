import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { DAOBaseClass } from 'src/utils/entities/DAOBaseClass';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { CardModel } from '../models/card.model';

export class CardDao extends DAOBaseClass {
  constructor(
    @InjectModel(CardModel)
    private readonly cardModel: ModelType<CardModel>,
  ) {
    super();
  }

  async getById(id: string) {
    return this.cardModel.findById(id).exec();
  }

  async getAllCards(boardId) {
    return this.cardModel.find({ boardId: boardId }).exec();
  }

  async createCard(dto: CreateCardDto) {
    const newCard = new this.cardModel(dto);
    return newCard.save();
  }

  async updateCardById(id: string, dto: UpdateCardDto) {
    return this.cardModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteCardById(id: string) {
    return this.cardModel.findByIdAndDelete(id).exec();
  }
}
