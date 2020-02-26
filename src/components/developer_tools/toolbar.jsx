import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {isDev, get} from '../../Network/client.js';

export default function DeveloperToolBar(props) {
    let [running, setRunning] = useState(undefined);
    if (!isDev()) {
        return null;
    }

    get('/connect/').then(r => {
        setRunning(r)
    });

    let linkStyle = {
        margin: '1em',
        color: 'white',
        textDecoration: 'none'
    }

    let connected;
    let connectedStyle = {
        position: 'absolute',
        right: '1em',
        top: '1em',
        color: 'white'
    }

    if (running === undefined) {
        connected = <span style={{}}>
            loading...
        </span>;
    } else if (running) {
        connected = <div style={{display: 'flex', verticalAlign: 'center'}}>
            <div style={{height: '1em', width: '1em', background: 'green', borderRadius: '50%', marginRight: '1em'}}>
            </div>
                <span style={{}}>
                Connected
            </span>
        </div>;
    } else {
        connected = <div style={{display: 'flex', verticalAlign: 'center'}}>
            <div style={{height: '1em', width: '1em', background: 'red', borderRadius: '50%', marginRight: '1em'}}></div>
            <span style={{}}>
                Not connected
            </span>
        </div>;
    }

    return <div>
            <div style={{
            padding: '1%',
            width: '98%',
            backgroundColor: '#555',
            position: 'fixed',
            top: '0'
        }}>
            <span style={{color: 'white', fontWeight: 'bold'}}>Developer toolbar</span>
            <Link style={linkStyle} to={'/dev'}>Devops</Link>
            <a style={linkStyle} href={'http://staging.backend.genstem.jakoblj.xyz/api/docs/'}>API Docs</a>
            <span style={{color: 'white', fontWeight: 'bold', margin: '1em'}}>|</span>
            <Link style={linkStyle} to={'/'}>Home</Link>
            <Link style={linkStyle} to={'/join'}>Join</Link>
            <Link style={linkStyle} to={'/create'}>Create</Link>
            <div style={connectedStyle}>
                {connected}
            </div>
        </div>
        <div style={{height: '1em'}}></div>
    </div>
}