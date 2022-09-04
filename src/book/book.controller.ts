import { Controller, Get, Body, Req, Param, Post, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from '../dto/book.dto';

import { UserService } from '../user/user.service';

//import { Request } from 'express'; // not using this because typescript complains that
                                     // isAuthorized doesnt exist on the request object definition.
                                     // This is true since we added it in the middleware.

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService, 
              private readonly userService: UserService) {}

  @Get('books')
  async getBooks( @Body('token') token: string, @Req() request: any ) {

    if (!request.isAuthorized) return { "error": request.authMessage };

    let books = await this.bookService.getBooks();
    if (!books) return { "error": "No books found for some reason"};

    return books;
    
  }

  @Get('books/:id')
  async getBook( @Param() params) {

    let book = await this.bookService.getBook(params.id);
    if (!book) return { "error": "No book found for this id"};

    return book;
    
  }

  @Put('books/:id')
  async updateBook( @Body() updatedBook: BookDto, @Param() params) {

    const book = await this.bookService.updateBook(params.id, updatedBook);
    if (!book.title) return { "error": "Book update appears to have failed"};

    return book;
    
  }

  @Delete('books/:id')
  async deleteBook( @Param() params) {

    const book = await this.bookService.deleteBook(params.id);
    if (!book.title) return { "error": "Book deletion appears to have failed"};

    // Now update the user document to reove the 'addedBooks' reference
    const updateUser = await this.userService.removeAddedBooksReference(book.addedby,book.id);

    return book;
    
  }

  @Post('books')
  async createBook( @Body() newBook: BookDto ) {

    const result = await this.bookService.createBook(newBook);
    if (!result.id) return { "error": "Book wasn't created for some reason" };

    // Now update the user document to include the 'added' reference
    const updateUser = await this.userService.insertAddedBooksReference(newBook.addedby,result.id);

    return result;
    
  }
  
}