import React from 'react';
import './Spinner.css'

const spinner = () =>{
    return (
        <div className={'LoaderWrapper'}>
            <div className={'Loader'}></div>
        </div>
    );
}

export default spinner;