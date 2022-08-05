import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Todo {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Field(() => String)
    @Prop()
    body: string;

    @Field(() => Date)
    @Prop()
    deadline: Date;
    
    @Field(() => Boolean)
    @Prop()
    completed: boolean;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);