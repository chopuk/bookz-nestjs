import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";

import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from '../book/book.model';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';

@Module({
  imports: [
    TypegooseModule.forFeature([{
        typegooseClass: Book,
        schemaOptions: { versionKey: false }
      },
      {
        typegooseClass: User,
        schemaOptions: { versionKey: false }
      }
    ])
  ],
  controllers: [BookController, UserController],
  providers:   [BookService, UserService],
})
export class BookModule {}