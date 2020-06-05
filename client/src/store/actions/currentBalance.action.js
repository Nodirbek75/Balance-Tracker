import * as actionTypes from './actionTypes';
import axios from 'axios';

const currentBalanceStart = () => {
    return{
        type: actionTypes.CURRENT_BALANCE_START
    }
}

const currentBalanceSuccess = (id, userId, currentBalance) => {
    return{
        type: actionTypes.CURRENT_BALANCE_SUCCESS,
        id: id,
        userId: userId,
        currentBalance: currentBalance
    }
}

const currentBalanceFail = (error) => {
    return{
        type: actionTypes.CURRENT_BALANCE_FAIL,
        error: error
    }
}

export const currentBalance = (userId, currentBalance, isAdd) => {
    const CrntBal = {
        userId: userId,
        currentBalance: currentBalance
    }

    return dispatch => {
        const url = isAdd ? '/currentBalance/add' : '/currentBalance/update';
        dispatch(currentBalanceStart());
        axios.post(url , CrntBal)
            .then(res => dispatch(currentBalanceSuccess(res.data._id, userId, currentBalance)))
            .catch(err =>dispatch(currentBalanceFail(err.response.data)));
    }
}

export const fetchCurrentBalance = (userId) => {
    return dispatch => {
        dispatch(currentBalanceStart());
        axios.get('/currentBalance/' + userId)
            .then(res => dispatch(currentBalanceSuccess(res.data._id, res.data.userId, res.data.currentBalance)))
            .catch( err => dispatch(currentBalanceFail(err.response.data)));
    }
}