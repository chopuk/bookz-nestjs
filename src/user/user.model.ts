import { prop, Ref } from '@typegoose/typegoose';
import { Schema, } from 'mongoose';

import { Book } from '../book/book.model';
 
export class User {
    // Created automatically, just needed for TS
    readonly _id: Schema.Types.ObjectId;
 
    @prop({ required: true })
    firstname: string;

    @prop({ required: true })
    lastname: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop({ ref: 'Book' })
    public addedBooks?: Ref<Book>[];

}

