import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModule } from 'src/user/user.module';
import { BoardController } from './controllers/board.controller';
import { BoardDao } from './DAO/board.dao';
import { BoardModel } from './models/board.model';
import { BoardService } from './servicies/board.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardDao],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: BoardModel,
        schemaOptions: {
          collection: 'Board',
        },
      },
    ]),
    UserModule,
  ],
  exports: [BoardService],
})
export class BoardModule {}
