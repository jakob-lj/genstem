import React, { Component } from "react";
import Input from "./../inputs";
import "./style_create.css";
import { post } from "./../../Network/client.js";
import Container from "./../Container";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: 0,
      loading: false,
      showError: false,
      error: ""
    };
    this.login = this.login.bind(this);
    this.loginWithSSOCode = this.loginWithSSOCode.bind(this);
    this.viewOne = this.viewOne.bind(this);
    this.viewZoer = this.viewZero.bind(this);
  }

  login() {
    const email = document.getElementById("email").value;
    this.setState({ loading: true });
    post("/auth/login/", { email }, false).then(r => {
      if (r.ok) {
        this.setState({ loginPage: 1, showError: false, loginId: r.id });
      } else if (r.err === "NOT_A_USER") {
        this.setState({
          loginPage: 0,
          showError: true,
          error: "Finner ingen registrert bruker med denne e-posten"
        });
      } else {
        this.setState({
          loginPage: 0,
          showError: true,
          error: "Det skjedde en feil"
        });
      }
    });
    console.log(this.state);
  }

  loginWithSSOCode() {
    console.log("yey");
  }

  Feedback(props) {
    let style = {
      display: "block"
    };
    if (!props.display) {
      style = {
        display: "none"
      };
    }
    console.log(style);
    return (
      <div style={style}>
        <div className="error">
          <span>{props.message}</span>
        </div>
      </div>
    );
  }

  viewZero(props) {
    if (props.currentState !== 0) {
      return null;
    }
    return (
      <div>
        <div>
          <Input placeholder={"E-post"} id={"email"} />
        </div>
        <button onClick={props.login} className="button" type="button">
          Enter
        </button>
      </div>
    );
  }

  viewOne(props) {
    if (props.currentState !== 1) {
      return null;
    }
    console.log('viewone');
    return (
      <div>
        <div>
          <Input placeholder={"Engangskode"} id={"SSOCode"} />
        </div>
        <button
          onClick={props.loginWithSSOCode}
          className="button"
          type="button">
          Enter
        </button>
      </div>
    );
  }

  test() {
    console.log("trying then");
    post("/auth/login/", { email: "joe@genstem.jakoblj.com" }, false).then(
      r => {
        console.log("hey");
      }
    );
  }

  render() {
    // {views[this.state.loginPage]()}
    return (
      <div>
        <h1 className="header">Genstem</h1>
        <Container>
          <this.viewZero
            login={this.login}
            currentState={this.state.loginPage}
          />
          <this.viewOne
            currentState={this.state.loginPage}
            login={this.loginWithSSOCode}
          />
          <this.Feedback
            message={this.state.error}
            display={this.state.showError}
          />
        </Container>
      </div>
    );
  }
}
