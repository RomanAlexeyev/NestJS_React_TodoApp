import { Field, InputType } from "@nestjs/graphql";

@InputType('TodoInputType')
export class TodoInputType {
    @Field()
    body: string;
}

@InputType('UpdateTodoInputType')
export class UpdateTodoInput {

    @Field({ nullable: true })
    body?: string;

    @Field({ nullable: true })
    completed?: boolean
}