import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../../component/UI/Spinner/Spnner';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as actionCreators from '../../../store/actions/index';

class Transaction extends Component{
    state = {
        type: '',
        inputBalance: 0,
        description: '',

        id: null,
        oldInputBalance: 0
    }

    componentDidMount(){
        const transactionsToEdit = this.props.transactions.filter(el => el._id === this.props.match.params.id);
        this.setState({
            type: transactionsToEdit[0].type,
            inputBalance: transactionsToEdit[0].inputBalance,
            description: transactionsToEdit[0].description,

            id: transactionsToEdit[0]._id,
            oldInputBalance: transactionsToEdit[0].inputBalance,
        })
    }


    onTypeChange = e => { this.setState({type: e.target.value})}
    oninputBalanceChange = e => { this.setState({inputBalance: e.target.value})}
    onDescriptionChange = e => { this.setState({description: e.target.value})}

    onSubmit = e => {
        e.preventDefault();
        let currentBalance = 0;
        if(this.state.type === 'income'){
            if(this.state.oldInputBalance > this.state.inputBalance){
                currentBalance = this.props.crntBal - (this.state.oldInputBalance - this.state.inputBalance);
            }else{
                currentBalance = this.props.crntBal + (this.state.inputBalance - this.state.oldInputBalance)
            }
        }else{
            if(this.state.oldInputBalance > this.state.inputBalance){
                currentBalance = this.props.crntBal + (this.state.oldInputBalance - this.state.inputBalance);
            }else{
                currentBalance = this.props.crntBal - (this.state.inputBalance - this.state.oldInputBalance)
            }
        }


        const transactionData = {
            id: this.state.id,
            userId: this.props.userId,
            type: this.state.type,
            currentBalance: currentBalance,
            inputBalance: this.state.inputBalance,
            description: this.state.description
        }

        this.props.onEditTransaction(transactionData);
        this.props.onUpdateCrntBal(this.props.userId, currentBalance);

        this.props.history.push('/transaction-list');
    }

    render(){
        let form = (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="inlineFormCustomSelectPref">Transaction Type</label>
                        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.onTypeChange}>
                            <option value={this.state.type}>{this.state.type}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Balance</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.inputBalance} onChange={this.oninputBalanceChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={this.state.description} onChange={this.onDescriptionChange}/>
                    </div>
                    
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
            </div>
        )
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={'container'}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        crntBal: state.crntBal.currentBalance,
        transactions: state.trans.transactions,
        error: state.trans.error,
        loading: state.trans.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditTransaction: (transactionData) => dispatch(actionCreators.editTransaction(transactionData)),
        onUpdateCrntBal: (userId, crntBal) => dispatch(actionCreators.currentBalance(userId, crntBal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);