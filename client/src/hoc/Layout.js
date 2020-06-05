import React from 'react';
import Navigation from '../component/Navigation/Navigation';
const Layout = (props) => (
    <div>
        <Navigation />
        {props.children}
    </div>
)

export default Layout;