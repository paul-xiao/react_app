import { userConstants } from "../constants";
const { SIGNUP, SIGNIN_SUCCESS, SIGNIN_FAIL } = userConstants
const initialState = {
    user: {},
    userInfo: {},
    message: {}
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP: {
      return {
          ...state
      }
    }
    case SIGNIN_SUCCESS: {
      const message = action.message
      return {
          ...state,
          message
      }
    }
    case SIGNIN_FAIL: {
      const message = action.message
      return {
          ...state,
          message
      }
    }
    case userConstants.GET_USER_INFO_REQUEST: {
      return {
          ...state,
          loading: action.preload.loading,
          userInfo: {}
      }
    }
    case userConstants.GET_USER_INFO_SUCCESS: {
      return {
          ...state,
          userInfo: action.preload.userInfo,
          loading: false
      }
    }
    case userConstants.GET_USER_INFO_FAIL: {
      return {
          ...state,
          userInfo: {},
          loading: false
      }
    }
    default: {
      return state;
    }
  }
};

export default user;
