import React from 'react'
import {AddTodo, TodoList, TodoFilter} from '../components/Todo'

const TodoApp = () => {
    return (
        <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <TodoFilter />
    </div>
    )
}

export default TodoApp