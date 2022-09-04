import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthMiddleware } from './auth.middleware';

import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';

import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
            // TypegooseModule.forRoot('mongodb://admin:0racle@ds057538.mlab.com:57538/bookz-graphql', { // old mLab connection
            TypegooseModule.forRoot('mongodb+srv://admin:0racle@bookz-graphql.4khyl.mongodb.net/bookz-graphql?retryWrites=true&w=majority', { // new mongodb.com connection
            useNewUrlParser: true, useUnifiedTopology: true }),
            BookModule,
            UserModule
          ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule  implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('books');
  }
  
} 