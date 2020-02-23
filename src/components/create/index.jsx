import React, { Component } from "react";
import Input from './../inputs';
import "./style_create.css";
import {post} from './../../Network/client.js';

export default class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginPage: 0,
            loading: false,
            showError: false,
            error: '',
        }
        this.login = this.login.bind(this);
        this.viewOne = this.viewOne.bind(this);
        this.viewZoer = this.viewZero.bind(this);
    }

  login() {
    const email = document.getElementById('email').value;
    this.setState({loading: true});
    post('/auth/login/', {email}, false).then(r => {
        if (r.ok) {
            this.setState({loginPage: 1, showError: false, loginId: r.id});
        } else if (r.err === 'NOT_A_USER') {
            this.setState({loginPage: 0, showError: true, error: 'Finner ingen registrert bruker med denne e-posten'});
        } else {
            this.setState({loginPage: 0, showError: true, error: 'Det skjedde en feil'});
        }
    });
    console.log(this.state);
  }

  Feedback(props) {
    let style = {
        display: 'block',
    }
    if (!props.display) {
        style = {
            'display':'none',
        }
    }
    console.log(style);
      return <div style={style}>
          <span>{props.message}</span>
      </div>;
  }

  viewZero(props) {
    return <div>
        <div>
                <Input placeholder={'E-post'} id={'email'} />
            </div>
            <button onClick={this.login} className="button" type="button">
                Enter
            </button>
        </div>
  }
  
  viewOne(props) {
      return <div>

      </div>
  }
  
  
  test() {
      console.log('trying then');
      post('/auth/login/', {email: 'joe@genstem.jakoblj.com'}, false).then(r => {
          console.log('hey')
        });
    }
    
    render() {
        let views = [this.viewZero, this.viewOne];
        return (
            <div>
        <h1 className="header">Genstem</h1>
        <div className="container">
            <this.Feedback message={this.state.error} display={this.state.showError} />
            {<Parent component={views[this.state.loginPage]()} />}
        </div>
      </div>
    );
  }
}

function Parent(props) {
    return <div>{props.compoent}</div>;
}
