import {gql} from "@apollo/client";

export const GET_TODOS = gql`
    query {
        getTodos {
            _id, body, deadline, completed
        }
    }
`