import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../user/user.model';

const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {

  constructor  (@InjectModel(User) private user: ReturnModelType<typeof User>) {}

  async login(email) {
    return await this.user.findOne(  {'email': email} );
  }

  async insertAddedBooksReference(UserId, BookId) {

    const myuser = await this.user.findById(UserId);
    const result = myuser.addedBooks.push(BookId);
    return await myuser.save();
    
  }

  async removeAddedBooksReference(UserId, BookId) {

    const myuser = await this.user.findById(UserId);

    // remove book from list of added books...
    myuser.addedBooks.splice(myuser.addedBooks.indexOf(BookId),1);
 
    return await myuser.save();
    
  }

  async registerUser(userDetails) {

    const hashedPassword = await bcrypt.hash(userDetails.password,12);
    userDetails.password = hashedPassword;

    const user = await this.user.create(userDetails);
    return { "id": user._id, "email": user.email };
    
  }

}