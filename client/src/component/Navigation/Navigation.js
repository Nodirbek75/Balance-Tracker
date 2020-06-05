import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navigation.scss';

class navigation extends Component{
    state = {
        checked: null
    }

    uncheckHandler = () => {
        this.setState({checked: false})
        setTimeout(()=>{
            this.setState({checked: null})
        }, 1)
    } 

    render(){
        return (
            <div className="navigation">
                <input type="checkbox" className="navigation__checkbox" id="navi-toggle" checked={this.state.checked}/>
    
                <label htmlFor="navi-toggle" className="navigation__button">
                    <span className="navigation__icon">&nbsp;</span>
                </label>
    
                <div className="navigation__background">&nbsp;</div>
    
                <nav className="navigation__nav">
                    <ul className="navigation__list">
                        <li className="navigation__item" onClick={this.uncheckHandler}><Link to="/balance" className="navigation__link">Home</Link></li>
                        <li className="navigation__item" onClick={this.uncheckHandler}><Link to="/transaction" className="navigation__link">Add Transaction</Link></li>
                        <li className="navigation__item" onClick={this.uncheckHandler}><Link to="/transaction-list" className="navigation__link">Transaction List</Link></li>
                        <li className="navigation__item" onClick={this.uncheckHandler}><Link to="/logout" className="navigation__link">Logout</Link></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default navigation;