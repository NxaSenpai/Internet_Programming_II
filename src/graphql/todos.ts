import { gql } from '@apollo/client/core'

// Fetch all todos, newest first
export const GET_TODOS = gql`
  query GetTodos {
    todos(order_by: { created_at: desc }) {
      id
      title
      is_done
      created_at
    }
  }
`

// Insert a new todo
export const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title
      is_done
      created_at
    }
  }
`

// Toggle is_done
export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: uuid!, $done: Boolean!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { is_done: $done }) {
      id
      is_done
    }
  }
`

// Delete a todo
export const DELETE_TODO = gql`
  mutation DeleteTodo($id: uuid!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`

// Real-time subscription (optional)
export const TODOS_SUB = gql`
  subscription TodosSub {
    todos(order_by: { created_at: desc }) {
      id
      title
      is_done
      created_at
    }
  }
`