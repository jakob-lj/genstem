import React, { useState, useEffect } from "react";
import {get, isDev} from './../../Network/client.js';
import { Redirect } from "react-router-dom";
import Container from "./../Container";


export default function DeveloperTools(props) {
    let [domain, setDomain] = useState(null);
    let [redirect, setRedirect] = useState(false);

    function reset() {
        localStorage.clear();
        setRedirect(true);
    }

    useEffect(() => {
        get('/environment/').then(r => {
            setDomain(r.domain);
        })
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
    return <Container>
        {inner}
        <SelectEnvironment cb={() => {setRedirect(true)}} />
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
