import * as actionTypes from '../actions/actionTypes';

const initState = {
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/auth'
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: 
            return {
                ...state, 
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.userId,
                error: null,
                loading: false,
                err: null,

            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error: action.err,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId: null,
                authRedirectPath: '/'
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return{
                ...state,
                authRedirectPath: action.path
            }
        default: return state
    }
}

export default reducer;