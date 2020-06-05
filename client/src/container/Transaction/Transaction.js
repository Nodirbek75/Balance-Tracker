import React, {Component} from 'react';
import {connect} from 'react-redux';
import Spinner from '../../component/UI/Spinner/Spnner';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as actionCreators from '../../store/actions/index';

class Transaction extends Component{
    state = {
        type: '',
        inputBalance: '',
        description: '',
        err: null
    }

    componentDidMount(){
        this.setState({err: this.props.error})
    }

    onTypeChange = e => { this.setState({type: e.target.value})}
    oninputBalanceChange = e => { this.setState({inputBalance: e.target.value})}
    onDescriptionChange = e => { this.setState({description: e.target.value})}

    onSubmit = e => {
        e.preventDefault();
        if(this.state.type){
            const currentBalance = this.state.type === 'income' ? 
            this.props.crntBalance + Number(this.state.inputBalance) :
            this.props.crntBalance - this.state.inputBalance;

            const transactionData = {
                userId: this.props.userId,
                type: this.state.type,
                currentBalance: currentBalance,
                inputBalance: this.state.inputBalance,
                description: this.state.description
            }

            this.props.onAddTransaction(transactionData);
            this.props.onUpdateCrntBal(this.props.userId, currentBalance);
            if(!this.props.error){
                this.props.history.push('/transaction-list');
            }else{
                console.log(this.state.error);
            }
        }else{
            this.setState({err: "Choose Transaction Type"});
        }
        
    }

    render(){
        const err = this.state.err !== null ? 
            <div className="alert alert-danger container__alert" role="alert">
                {this.state.err}
            </div> : null;

        let form = (
            <div>
                 {err}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="inlineFormCustomSelectPref">Transaction Type</label>
                        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.onTypeChange} required>
                            <option>Choose one...</option>
                            <option value="income">Income</option>
                            <option value="expence">Expence</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Balance</label>
                        <input type="Number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.inputBalance} onChange={this.oninputBalanceChange} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" value={this.state.description} onChange={this.onDescriptionChange} required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
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
        crntBalance: state.crntBal.currentBalance,
        userId: state.auth.userId,
        error: state.trans.error,
        loading: state.trans.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTransaction: (transactionData) => dispatch(actionCreators.addTransaction(transactionData)),
        onUpdateCrntBal: (userId, crntBal) => dispatch(actionCreators.currentBalance(userId, crntBal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);