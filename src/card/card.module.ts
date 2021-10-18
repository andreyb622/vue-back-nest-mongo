import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ColumnModule } from 'src/column/column.module';
import { CardController } from './controllers/card.controller';
import { CardDao } from './DAO/card.dao';
import { CardModel } from './models/card.model';
import { CardService } from './servicies/card.service';

@Module({
  controllers: [CardController],
  providers: [CardService, CardDao],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: CardModel,
        schemaOptions: {
          collection: 'card',
        },
      },
    ]),
    ColumnModule,
  ],
  exports: [CardService],
})
export class CardModule {}
