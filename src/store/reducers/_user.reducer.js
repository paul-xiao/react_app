import { userConstants } from "../constants";
const { SIGNUP } = userConstants
const initialState = {
    user: {}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
        const { username } = action.payload
      return {
          ...state,
          username
      }
    }
    default: {
      return state;
    }
  }
};

export default user;
