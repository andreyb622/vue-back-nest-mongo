import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardModule } from 'src/board/board.module';
import { ColumnController } from './controllers/column.controller';
import { ColumnDao } from './DAO/column.dao';
import { ColumnModel } from './models/column.model';
import { ColumnService } from './servicies/column.service';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService, ColumnDao],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ColumnModel,
        schemaOptions: {
          collection: 'Column',
        },
      },
    ]),
    BoardModule,
  ],
})
export class ColumnModule {}
