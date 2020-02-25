import React, { Component } from "react";

import Container from "./../Container";

import "./style_join.css";

export default class Join extends Component {
  login() {
    console.log("login");
  }

  render() {
    return (
      <div>
        <h1 className="header">Genstem</h1>
        <Container></Container>
      </div>
    );
  }
}
