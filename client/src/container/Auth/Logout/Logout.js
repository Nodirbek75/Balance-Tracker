import React, { Component } from 'react';
import { Redirect } from 'react-router';
import * as actionCreators from '../../../store/actions/index';
import { connect } from 'react-redux';

class Logout extends Component{
    componentDidMount(){
        this.props.onLogout();
    }
    render(){
        return(
            <Redirect to='/' />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actionCreators.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);