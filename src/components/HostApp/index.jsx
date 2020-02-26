import React, { useState, useEffect } from 'react';
import Container from './../Container';
import { get } from '../../Network/client';

export default function Host(props) {

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        get('/events/').then(r => {
            console.log(r);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Container>
            loading...
        </Container>
    }

    return <Container>
        <p>This is host</p>
    </Container>;
}