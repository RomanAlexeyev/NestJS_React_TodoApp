import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoInputType, UpdateTodoInput } from './todo.dto';
import { Todo } from './todo.schema';

@Resolver()
export class TodoResolver {
    constructor(private readonly todoService: TodoService) { }

    @Query(() => [Todo])
    async getTodos() {
        return this.todoService.findAll();
    }

    @Mutation(() => Todo)
    async addTodo(@Args('input') input: TodoInputType) {
        return this.todoService.create(input);
    }

    @Mutation(() => Todo)
    async updateTodo(@Args('id') id: string, @Args('input') input: UpdateTodoInput) {
        return this.todoService.update(id, input);
    }

    @Mutation(() => Todo)
    async deleteTodo(@Args('id') id: string) {
        return this.todoService.delete(id);
    }
}
