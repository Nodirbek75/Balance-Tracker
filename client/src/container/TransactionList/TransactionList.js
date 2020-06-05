import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './TransactionList.scss'

class TransactionList extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.onFetchTransactions(this.props.userId);
        }, 500);
    }

    editTransactionHandler = (id) => {
        this.props.history.push('/transaction/'+id);
    }

    deleteTransactionHandler = (transaction) => {
        this.props.onDeleteTransaction(transaction._id);
        let currentBalance = null;
        if(transaction.type === 'income'){
            currentBalance = this.props.crntBal - transaction.inputBalance;
        }else{
            currentBalance = this.props.crntBal + transaction.inputBalance;
        }
        this.props.onUpdateCrntBal(this.props.userId, currentBalance);
    }

    render(){
        const transList = this.props.transactions.reverse();
        const transactionList = transList.map(trans => {
                return(
                    <tr key={trans._id}>
                        <th scope="row">{trans.createdAt.substring(0,10)}</th>
                        <td>{trans.type}</td>
                        <td>{trans.currentBalance}</td>
                        <td>{trans.inputBalance}</td>
                        <td>{trans.description}</td>
                        <td 
                        className={'btn btn-link TransactionList__btn'} 
                        onClick={() => this.editTransactionHandler(trans._id)}>Edit</td>
                        <td 
                        className={'btn btn-link TransactionList__btn'}
                        onClick={() => this.deleteTransactionHandler(trans)}>Delete</td>
                    </tr>
                )
            })
        

        return(
            <div className={'TransactionList'}>
                <div className={'TransactionList__currentBalance'}>
                    <h1 className={'TransactionList__text'}>Current Balance</h1>
                    <div className={'TransactionList__balance'}>{this.props.crntBal}$</div>
                </div>
                <div className={'TransactionList__table'}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Transaction Type</th>
                                <th scope="col">Current Balance</th>
                                <th scope="col">Input Balance</th>
                                <th scope="col">Description</th>
                                <th scope="col">Edit | Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        transactions: state.trans.transactions,
        userId: state.auth.userId,
        crntBal: state.crntBal.currentBalance
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTransaction: (id) => dispatch(actionCreators.deleteTransaction(id)),
        onFetchTransactions: (userId) => dispatch(actionCreators.fetchTransactions(userId)),
        onUpdateCrntBal: (userId, crntBal) => dispatch(actionCreators.currentBalance(userId, crntBal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);