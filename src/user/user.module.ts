import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { getJWTConfig } from 'src/configs/jwt.config';
import { UserController } from './user.controller';
import { UserModel } from './models/user.model';
import { UserService } from './servicies/user.service';
import { UserDao } from './DAO/user.dao';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDao],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'user',
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
