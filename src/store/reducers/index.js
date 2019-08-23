import { combineReducers } from "redux";
import todos from "./_todos.reducer";
import user from "./_user.reducer";
export default combineReducers({ todos, user });
