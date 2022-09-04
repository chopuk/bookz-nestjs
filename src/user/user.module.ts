import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../user/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([{
        typegooseClass: User,
        schemaOptions: { versionKey: false }
      }])
  ],
  controllers: [UserController],
  providers:   [UserService],
})
export class UserModule {}