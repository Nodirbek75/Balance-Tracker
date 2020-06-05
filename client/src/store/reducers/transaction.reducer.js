import * as actionTypes from '../actions/actionTypes';


const initState = {
    transactions: [],
    loading: false,
    error: null
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.TRANSACTION_START:
            return{
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.TRANSACTION_FAIL:
            return{
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.TRANSACTION_SUCCESS:
            return{
                ...state,
                transactions: state.transactions.concat(action.transaction),
                loading: false
            }
        case actionTypes.TRANSACTION_EDIT_SUCCESS:
            return{
                ...state,
                transactions: state.transactions.filter(trans => trans._id !== action.transaction._id ? trans : action.transaction),
                loading: false
            }
        case actionTypes.TRANSACTION_FETCH_SUCCESS:
            return{
                ...state,
                transactions: action.transactions,
                loading: false
            }
        case actionTypes.TRANSACTION_DELETE_SUCCESS:
            return{
                ...state,
                transactions: state.transactions.filter(trans => trans._id !== action.transaction._id),
                loading: false
            }

        default: return state;
    }
}

export default reducer;