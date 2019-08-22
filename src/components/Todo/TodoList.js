import React from 'react'
import Todo from './Todo'
import { connect } from "react-redux";


const TodoList = ({todos}) => (
    <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${index}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
)

const mapStateToProps = state => {
    console.log(state.todos)
  return {
      todos: state.todos && Object.values(state.todos.byIds)
    }
}

export default connect(mapStateToProps)(TodoList);