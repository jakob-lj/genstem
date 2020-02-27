import React, { useState, useEffect } from "react";
import {get, getWithOutHandleErr, isDev, loginUser} from './../../Network/client.js';
import { Redirect } from "react-router-dom";
import Container from "./../Container";


export default function DeveloperTools(props) {
    let [domain, setDomain] = useState(null);
    let [redirect, setRedirect] = useState(false);
    let [loggedInAsUser, setLoggedInAsUser] = useState(null);

    function reset() {
        localStorage.clear();
        setRedirect(true);
    }

    function callback(e) {
        // setRedirect(true);
        window.location.href = '/';
    }

    function loginAsJoe() {
        get('/auth/backdoor/', false).then(r => {
            if (r) {
                loginUser(r);
                getCurrentUser();
            } else {
                alert('only available if backend is in local mode');
            }
        });
    }

    function getCurrentUser() {
        getWithOutHandleErr('/auth/profile/', false).then( async r => {
            if (r.status === 200) {
                let json = await r.json();
                setLoggedInAsUser(json);
            } else {
                setLoggedInAsUser('unathenticated');
            }
        });
    }

    useEffect(() => {
        get('/environment/').then(r => {
            setDomain(r.domain);
        });
        getCurrentUser();
    }, []);

    if (!isDev() | redirect) {
        return <Redirect to={{pathname:'/'}} />;
    }

    let inner;

    if (domain === null) {
        inner =  <div>Loading...</div>;
    } else {
        inner = <div>
        <div>
            Domain: {domain}
        </div>
        </div>
    }

    let user = 'loading';
    if (loggedInAsUser !== null && loggedInAsUser !== 'unathenticated') {
        user = `${loggedInAsUser.name} - ${loggedInAsUser.email}`
    } else if (loggedInAsUser === 'unathenticated') {
        user = 'not logged in';
    }

    return <Container>
        {inner}
        <SelectEnvironment cb={callback} />
        <div>
            Logged in as: {user}
        </div>
        <button onClick={loginAsJoe}>Login as Joe User (admin)</button>
        <button onClick={reset}>Reset localstorage</button>
    </Container>;
}

function SelectEnvironment(props) {

    function save() {
        let env = document.getElementById('environment').value;
        localStorage.setItem('genstemStaging', env);
        props.cb();
    }

    let variable = localStorage.getItem('genstemStaging');
    if (variable === null) {
        variable = 'staging';
    }
    return <div>
        <h3>Velg environment</h3>
        <select id={'environment'} defaultValue={variable}>
            <option value={'local'}>
                localhost
            </option>
            <option value={'staging'}>
                staging.backend.genstem.jakoblj.xyz
            </option>
        </select>
        <button onClick={save}>Lagre</button>
    </div>;
}
