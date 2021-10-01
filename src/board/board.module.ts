import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardController } from './board.controller';
import { BoardModel } from './board.model';
import { BoardService } from './board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BoardModel,
        schemaOptions: {
          collection: 'Board',
        },
      },
    ]),
  ],
})
export class BoardModule {}
