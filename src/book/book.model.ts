import { prop, Ref } from '@typegoose/typegoose';
import { Schema } from 'mongoose';

import { User } from '../user/user.model';
 
export class Book {
    // Created automatically, just needed for TS
    readonly _id: Schema.Types.ObjectId;
 
    @prop({ required: true })
    title: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    author: string;
    
    @prop({ required: true })
    publisher: string;

    @prop({ required: true })
    price: number;
    
    @prop({ required: true })
    quantity: string;

    @prop({ ref: 'User' })
    public addedby?: Ref<User>;

}

