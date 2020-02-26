import React from 'react';
import {Link} from 'react-router-dom';
import {isDev} from '../../Network/client.js';

export default function DeveloperToolBar(props) {
    if (!isDev()) {
        return null;
    }

    let linkStyle = {
        margin: '1em',
        color: 'white',
        textDecoration: 'none'
    }

    return <div style={{
        padding: '1%',
        width: '98%',
        backgroundColor: '#555'
    }}>
        <span style={{color: 'white', fontWeight: 'bold'}}>Developer toolbar</span>
        <Link style={linkStyle} to={'/dev'}>Devops</Link>
        <span style={{color: 'white', fontWeight: 'bold'}}>|</span>
        <Link style={linkStyle} to={'/'}>Home</Link>
        <Link style={linkStyle} to={'/join'}>Join</Link>
        <Link style={linkStyle} to={'/create'}>Create</Link>
    </div>
}