import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Book } from '../book/book.model';

@Injectable()
export class BookService {

  constructor  (@InjectModel(Book) private book: ReturnModelType<typeof Book>) {}

  async getBooks() {
    return await this.book.find();
  }

  async getBook(id) {
    return await this.book.findById(id);
  }

  async updateBook(id,BookDto) {

    const result = await this.book.updateOne(  {_id: id },
      {
        $set: {
          title: BookDto.title,
          description: BookDto.description,
          author: BookDto.author,
          publisher: BookDto.publisher,
          price: BookDto.price,
          quantity: BookDto.quantity
        }
      });
      return { "userId": id, "title": BookDto.title };

  }

  async createBook(BookDto) {

    const book = await this.book.create(BookDto);
    return { "id": book._id, "title": book.title };
    
  }

  async deleteBook(id) {
    return await this.book.findByIdAndDelete(id);
  }

}
