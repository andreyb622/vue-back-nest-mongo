import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { BoardModule } from 'src/board/board.module';
import { getJWTConfig } from 'src/configs/jwt.config';
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class ColumnModule {}
