import React from 'react';
import {Redirect} from 'react-router-dom';

export default function LogOut(props) {
    let server = localStorage.getItem('genstemStaging');
    localStorage.clear();
    localStorage.setItem('genstemStaging', server);
    return <Redirect to={'/'} />
}