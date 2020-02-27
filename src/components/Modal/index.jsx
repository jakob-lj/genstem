
import React, {} from 'react';
import './modal.css';

export default function Modal(props) {

    let show = 'none';
    if (props.visibility) {
        show = 'block';
    }

    let child = props.children;
    if (props.loading) {
        child = <ModalLoading />
    }

    return <div style={{display: show}} className={'modal-wrapper'}>
        <div className={'modal-body'}>
            <div className={'modal-header'}>
                <h3>{props.header ? props.header : 'Modal'}</h3>
            </div>
            <div className={'modal-content'}>
                {child}
            </div>
        </div>
    </div>;
}

function ModalLoading(props) {
    return <div className={'loading-wrapper'}>
        <div className={'loading'}></div>
    </div>
}