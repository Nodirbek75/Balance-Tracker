import * as actionTypes from './actionTypes';
import axios from 'axios';


const transactionStart = () => {
    return{
        type: actionTypes.TRANSACTION_START
    }
}

const transactionSuccess = (transaction) => {
    return{
        type: actionTypes.TRANSACTION_SUCCESS,
        transaction: transaction
    }
}

const transactionFail = (error) => {
    return{
        type: actionTypes.TRANSACTION_FAIL,
        error: error
    }
}

export const addTransaction = (transaction) => {
    return dispatch => {
        dispatch(transactionStart());
        axios.post('/transaction/add', transaction)
            .then(res => dispatch(transactionSuccess(res.data)))
            .catch(err => dispatch(transactionFail(err.response.data)));
    }
}

const transactionEditSuccess = (transaction) => {
    return{
        type: actionTypes.TRANSACTION_EDIT_SUCCESS,
        transaction: transaction
    }
}

export const editTransaction = (transaction) => {
    return dispatch => {
        dispatch(transactionStart());
        axios.post('/transaction/edit/' + transaction.id, transaction)
            .then(res => dispatch(transactionEditSuccess(res.data)))
            .catch(err => dispatch(transactionFail(err.response.data)));
    }
}

const transactionFetchSuccess = (transactions) => {
    return{
        type: actionTypes.TRANSACTION_FETCH_SUCCESS,
        transactions: transactions
    }
}

export const fetchTransactions = (userId) => {
    return dispatch => {
        dispatch(transactionStart());
        axios.get('/transaction/' + userId)
            .then( res => dispatch(transactionFetchSuccess(res.data)))
            .catch(err => dispatch(transactionFail(err.response.data)));
    }
}

const transactionDeleteSuccess = (transaction) => {
    return{
        type: actionTypes.TRANSACTION_DELETE_SUCCESS,
        transaction: transaction
    }
}

export const deleteTransaction = (id) => {
    return dispatch => {
        dispatch(transactionStart());
        axios.post('/transaction/delete/'+id)
            .then(res => dispatch(transactionDeleteSuccess(res.data)))
            .catch(err => dispatch(transactionFail(err.response.data)));
    }
}