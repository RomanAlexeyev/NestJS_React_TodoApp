import { Field, InputType } from "@nestjs/graphql";

@InputType('AddTodoInput')
export class AddTodoInput {
    @Field()
    body: string;

    @Field()
    deadline: string;
}

@InputType('UpdateTodoInput')
export class UpdateTodoInput {

    @Field({ nullable: true })
    body?: string;

    @Field({ nullable: true })
    deadline?: string;

    @Field({ nullable: true })
    completed?: boolean
}