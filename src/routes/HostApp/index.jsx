import React, { useState, useEffect } from 'react';
import Container from './../../components/Container/index';
import { get } from '../../Network/client';

export default function Host(props) {

    let [loading, setLoading] = useState(true);
    let [events, setEvents] = useState([]);

    useEffect(() => {
        get('/events/').then(r => {
            console.log(r); // remove when sure what it does
            setLoading(false);
            setEvents(r);
        });
    }, []);

    if (loading) {
        return <Container>
            loading...
        </Container>
    }

    let eventsDiv = events.map(event => {
        return <div key={event.id}>{event.name} - {event.active ? 'active' : 'inactive'} - {event.startDate}</div>
    });

    return <Container>
        <button onClick={() => alert('implement - and style better pllllz')}>Legg til arrangement</button>
        {eventsDiv}
    </Container>;
}