import * as actionTypes from './actionTypes';
import * as actionCreators from './index';
import axios from 'axios';

const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        userId: userId
    };
};

const authFail = (err) => {
    return{
        type: actionTypes.AUTH_FAIL,
        err: err
    };
};

export const authLogout = () => {
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

const authSetAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const auth = (username, password, isSignUp, currentBalance) => {
    const user = {
        username: username,
        password: password
    };
    return dispatch => {
        dispatch(authStart());
        const url = isSignUp ? '/user/register' : '/user/login';
        
        axios.post(url, user)
            .then(res => {
                localStorage.setItem("userId", res.data._id);

                dispatch(authSuccess(res.data._id));
                dispatch(authSetAuthRedirectPath('/balance'));
                isSignUp ?
                    dispatch(actionCreators.currentBalance(res.data._id, currentBalance, true)) :
                    dispatch(actionCreators.fetchCurrentBalance(res.data._id))
            })
            .catch(err => {
                dispatch(authFail(err.response.data))
                dispatch(authSetAuthRedirectPath('/auth'))
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const userId = localStorage.getItem('userId');
        if(!userId){
            authLogout()
        }else{
            dispatch(authSuccess(userId));
            dispatch(actionCreators.fetchTransactions(userId));
            dispatch(actionCreators.fetchCurrentBalance(userId))
        }
    }
}