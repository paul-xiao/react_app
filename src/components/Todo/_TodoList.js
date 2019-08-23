import React from 'react'
import Todo from './_Todo'
import { connect } from "react-redux";

const style = {
  padding: '20px'
}
const TodoList = ({todos}) => (
    <ul className="todo-list" style = {style}>
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${index}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
)

const mapStateToProps = state => {
    const todos = Object.values(state.todos.byIds)
  return {
      todos: state.todos && todos.map((item,index) => Object.assign(item, {id: index + 1}))
    }
}

export default connect(mapStateToProps)(TodoList);