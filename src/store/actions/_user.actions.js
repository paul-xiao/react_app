import {
    userConstants
} from "../constants";
import { userServices } from '../../services'
import {history} from '../../utils'
import { enqueueSnackbar } from '../actions/_snackbar.actions';
const signup = ({username, password}) => {
    return dispatch => {
        userServices.signup({username, password}).then(res => {
            if(res.status) {
                history.push('/')
               alert(res.message)
            } else {
                alert(res.message)
            }
        })
    }
}

const signin = ({username, password}) => {
    const SIGNIN_SUCCESS = (user) => {
        return {
            type: userConstants.SIGNIN_SUCCESS,
            message: {
                success: 'SignIn success ! '
            }
        }
    }
    const SIGNIN_FAIL = (user) => {
        return {
            type: userConstants.SIGNIN_FAIL,
            message: {
                error: 'SignIn failed ! '
            }
        }
    }
    return dispatch => {
        userServices.signin({username, password}).then(res => {
            if(res.status) {
                dispatch(SIGNIN_SUCCESS(res))
                dispatch(enqueueSnackbar('SignIn success ! '))
                history.push('/')
            } else {
                dispatch(SIGNIN_FAIL())
                dispatch(enqueueSnackbar('SignIn failed ! '))
            }
        })
    }   
}

const getUserInfo = () => {
    const GET_USER_INFO_REQUEST = () => {
        return {
            type: userConstants.GET_USER_INFO_REQUEST,
            preload: {
                loading: true
            }
        }
    }
    const GET_USER_INFO_SUCCESS = (userInfo) => {
        return {
            type: userConstants.GET_USER_INFO_SUCCESS,
            preload: {
                userInfo: userInfo
            }
        }
    }
    const GET_USER_INFO_FAIL = (err) => {
        return {
            type: userConstants.GET_USER_INFO_FAIL,
            preload: {
                error: err
            }
        }
    }
    return dispatch => {
        dispatch(GET_USER_INFO_REQUEST())
        userServices.getUserInfo().then(res => {
            dispatch(GET_USER_INFO_SUCCESS(res.userInfo))
        }, err => {
            dispatch(GET_USER_INFO_FAIL(err))
        })
    }
}

const logout = () => {
    const LOGOUT = () => {
        return {
            type: 'LOGOUT',
            preload: {

            }
        }
    }
    return dispatch => {
        userServices.logout()
        dispatch(LOGOUT())
    }
}


const userActions = {
    signup,
    signin,
    getUserInfo,
    logout
}


export default userActions