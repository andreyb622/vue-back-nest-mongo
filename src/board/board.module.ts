import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { getJWTConfig } from 'src/configs/jwt.config';
import { UserModule } from 'src/user/user.module';
import { BoardController } from './board.controller';
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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class BoardModule {}
