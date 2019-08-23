import {
    userConstants
} from "../constants";

import { userServices } from '../../services'

const {
    SIGNUP,
    SIGNIN,
    LOGOUT
} = userConstants

const signup = ({username, password}) => {
    const success = (username) => {
        return {
            type: SIGNUP,
            payload: {
                username: username
            }
        }
    }
    return dispatch => {
        dispatch(success('username'))

        userServices.signup({username, password}).then(res => {
            console.log(res)
            dispatch(success('username'))
        })
    }

   
}

const signin = id => ({
    type: SIGNIN,
    payload: {
        id
    }
});

const logout = filter => ({
    type: LOGOUT,
    payload: {
        filter
    }
});

const userActions = {
    signup,
    signin,
    logout
}


export default userActions