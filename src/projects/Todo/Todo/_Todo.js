import React from 'react'
import { connect } from 'react-redux'
import { todoActions } from "../../../store/actions";

const { toggleTodo } = todoActions

const style = {
    todo: {
      cursor: 'pointer'
    },
    status: {
        color: 'red',
        padding: '0 15px'
    }
} 
const Todo = ({todo, toggleTodo}) => {
    return (
       <div style={style.todo} onClick={() => toggleTodo(todo.id)}>
           <span>{todo.id}</span>
          <span style={style.status}>{todo.completed ? 'done' : 'pending'}</span>
          <span>{todo.content}</span>
       </div>
    )
}

export default connect(
    null,
    { toggleTodo }
  )(Todo);