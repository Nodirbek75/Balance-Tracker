import * as actionTypes from '../actions/actionTypes';

const initState = {
    id: null,
    userId: null,
    currentBalance: 0,
    error: null,
    loading: false
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.CURRENT_BALANCE_START: 
            return{
                ...state,
                loading: true
            };
        case actionTypes.CURRENT_BALANCE_SUCCESS: 
            return{
                ...state,
                id: action.id,
                userId: action.userId,
                currentBalance: action.currentBalance,
                loading: false
            };
        case actionTypes.CURRENT_BALANCE_FAIL: 
            return{
                ...state,
                error: action.error,
                loading: false
            };
        default: return state;
    }
}

export default reducer;