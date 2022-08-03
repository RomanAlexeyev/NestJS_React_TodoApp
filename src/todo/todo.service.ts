import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Todo, TodoDocument } from './todo.schema';
import { TodoInputType, UpdateTodoInput } from './todo.dto';

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async findAll(): Promise<Todo[]> {
        return this.todoModel.find().exec();
    }

    async create(input: TodoInputType): Promise<Todo> {
        const createdTodo = new this.todoModel(input);
        createdTodo.createdAt = new Date();
        createdTodo.completed = false;
        return createdTodo.save();
    }

    async update(id: string, updateTodoDto: UpdateTodoInput): Promise<Todo> {
        return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
    }

    async delete(id: string): Promise<Todo> {
        return this.todoModel.findByIdAndDelete(id);
    }
}
