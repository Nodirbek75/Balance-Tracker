import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../../component/UI/Spinner/Spnner';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Auth.scss'
import * as actionCreators from '../../store/actions/index';

class Login extends Component{
    state={
        username: '',
        password: '',
        currentBalance: '',
        isSignUp: true
    }

    onUsernameChange = e => {this.setState({username: e.target.value})};
    onPasswordChange = e => {this.setState({password: e.target.value})};
    onCurrentBalanceChange = e => {this.setState({currentBalance: e.target.value})};

    onSubmit = e => {
        e.preventDefault();
        this.props.onAuth(this.state.username, this.state.password, this.state.isSignUp, this.state.currentBalance);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        });
    };

    render(){
        
        const error = this.props.err !== null ? 
            <div className="alert alert-danger container__alert" role="alert">
                {this.props.err}
            </div> : null;
        const redirect = <Redirect to={this.props.redirectPath} />;
        
        let form = (
            <div>
                {redirect}
                {error}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={this.state.username} onChange={this.onUsernameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.onPasswordChange}/>
                    </div>
                    {this.state.isSignUp ? 
                        <div className="form-group">
                            <label htmlFor="exampleInputBalance">Current Balance</label>
                            <input type="number" className="form-control" id="exampleInputBalance" value={this.state.currentBalance} onChange={this.onCurrentBalanceChange} required/>
                        </div> : null}
                    <button type="submit" className="btn btn-dark">Submit</button>
                </form>
                <button 
                        className="btn btn-dark container__btn"
                        onClick={this.switchAuthModeHandler}>
                            Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
        )
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={'container'}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        err: state.auth.error,
        loading: state.auth.loading,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (username, password, isSignUp, currentBalance) => dispatch(actionCreators.auth(username, password, isSignUp, currentBalance))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(Login);