import React, { Component } from "react";
import Input from "./../inputs";
import "./style_create.css";
import { post } from "./../../Network/client.js";
import Container from "./../Container";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: 0,
      loading: false,
      showError: false,
      error: "",
      userId: null,
      redirect: null
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
        this.setState({
          loginPage: 1,
          showError: false,
          userId: r.id,
          loading: false
        });
      } else if (r.err === "NOT_A_USER") {
        this.setState({
          loginPage: 0,
          showError: true,
          error: "Finner ingen registrert bruker med denne e-posten",
          loading: false
        });
      } else {
        this.setState({
          loginPage: 0,
          showError: true,
          error: "Det skjedde en feil",
          loading: false
        });
      }
    });
  }

  loginWithSSOCode() {
    console.log("yey");
    let code = document.getElementById("SSOCode").value;
    let id = this.state.userId;
    post("/auth/token/", { id, code }, false).then(r => {
      if (r.ok) {
        // user got logged in
        localStorage.setItem("genstemToken", r.tokens.access);
        this.setState({ redirect: "/host" });
      } else if (r.err === "CODE_EXPIRED") {
        this.setState({
          showError: true,
          error: "Koden er ikke riktig, eller ikke gyldig lenger",
          loading: false
        });
      }
    });
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
        <Link to={"/home"}>
          <button className="button" type="button">
            Back
          </button>
        </Link>
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
    return (
      <div>
        <div>
          <Input placeholder={"Engangskode"} id={"SSOCode"} />
        </div>
        <Link to={"/home"}>
          <button className="button" type="button">
            Back
          </button>
        </Link>
        <button onClick={props.login} className="button" type="button">
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
    if (this.state.redirect !== null) {
      return <Redirect to={this.state.redirect} />;
    }

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
