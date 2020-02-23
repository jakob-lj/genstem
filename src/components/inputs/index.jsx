import React from 'react';
import './style_input.css';

export default function Input(props) {
    console.log('called');
    return <div>
        <div><label className={'label'}>{props.placeholder}</label></div>
        <div style={{margin: '1em'}}><input placeholder={props.placeholder} id={props.id} /></div>
    </div>
}