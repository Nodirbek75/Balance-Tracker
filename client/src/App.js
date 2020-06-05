import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout';
import LandingPage from './component/LandingPage/LandingPage';
import MainPage from './container/MainPage/MainPage';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import Transaction from './container/Transaction/Transaction';
import TransactionEdit from './container/Transaction/TransactionEdit/TransactionEdit';
import TransactionList from './container/TransactionList/TransactionList';
import * as actionCreatots from './store/actions/index';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render(){

    let routes = null;
    if(!this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path={'/auth'} component={Auth}/>
          <Route path={'/'} component={LandingPage}/>
          <Redirect to={'/'} />
        </Switch>
      )
    }
    else{
      routes = (
          <Switch>
            <Route path={'/auth'} component={Auth}/>
            <Route path={'/balance'} exact component={MainPage}/>
            <Route path={'/logout'} component={Logout}/>
            <Route path={'/transaction'} exact component={Transaction}/>
            <Route path={'/transaction/:id'} component={TransactionEdit}/>
            <Route path={'/transaction-list'} component={TransactionList}/>
            <Route path={'/'} component={LandingPage}/>
            <Redirect to={'/'} />
          </Switch>
      )
    }
    return (
      <Layout>
          {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.userId !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actionCreatots.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
