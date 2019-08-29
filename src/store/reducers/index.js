import { combineReducers } from "redux";
import todos from "./_todos.reducer";
import user from "./_user.reducer";
import snackbar from "./_snackbar.reducer";
export default combineReducers({ todos, user, snackbar });
