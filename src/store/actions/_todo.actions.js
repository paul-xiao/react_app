import {
    todoConstants
} from "../constants";

const {
    ADD_TODO,
    TOGGLE_TODO,
    SET_FILTER
} = todoConstants
let nextTodoId = 0;

const addTodo = content => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
});

const toggleTodo = id => ({
    type: TOGGLE_TODO,
    payload: {
        id
    }
});

const setFilter = filter => ({
    type: SET_FILTER,
    payload: {
        filter
    }
});

const todoActions = {
    addTodo,
    toggleTodo,
    setFilter
}


export default todoActions