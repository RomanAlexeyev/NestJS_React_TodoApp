import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { Todo, TodoSchema } from './todo.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])],
    providers: [TodoService, TodoResolver],
})
export class TodoModule {}
