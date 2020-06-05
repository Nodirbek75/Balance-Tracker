import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import './MainPage.scss';

class MainPage extends Component {
    componentDidMount(){
        this.props.onFetchCrntBal(this.props.userId);
    }
    render(){
        return(
            <div className={'CurrentBalance'}>
                <div className={'CurrentBalance__box'}>
                    <h1 className={'CurrentBalance__text'}>Current Balance</h1>
                    <div className={'CurrentBalance__balance'}>{this.props.balance}$</div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        balance: state.crntBal.currentBalance,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchCrntBal: (userId) => dispatch(actionCreators.fetchCurrentBalance(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);