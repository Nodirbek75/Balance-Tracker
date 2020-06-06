import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.scss';

const LandingPage = () => (
    <div className={'LandingPage'}>
        <div className={'LandingPage__container'}>
            <div className={'LandingPage__btnBox'}>
                <Link to={'/auth'} className={'LandingPage__btn'}>Sign in | Sign up</Link>
            </div>
            <div className={'LandingPage__outerBox'}></div>
            <div className={'LandingPage__middleBox'}></div>
            <div className={'LandingPage__innerBox'}></div>
        </div>
    </div>
)

export default LandingPage;