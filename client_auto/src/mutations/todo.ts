import {gql} from "@apollo/client";

export const ADD_TODO = gql`
    mutation addTodo($input: AddTodoInput!) {
        addTodo(input: $input) {
            _id, body, deadline, completed
        }
    }
`

export const UPDATE_TODO = gql`
    mutation updateTodo($id: String!, $input: UpdateTodoInput!) {
        updateTodo(id: $id, input: $input) {
            _id, body, deadline, completed
        }
    }
`

export const DELETE_TODO = gql`
    mutation deleteTodo($id: String!) {
        deleteTodo(id: $id) {
            _id, body, deadline, completed
        }
    }
`