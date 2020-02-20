import React, { Component } from "react";
import "./style_join.css";

export default class Join extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Genstem</h1>
        <div className="container">
          <input className="username" placeholder="Username"></input>
          <input className="password" placeholder="Password"></input>
          <button className="button" type="button">
            Enter
          </button>
        </div>
      </div>
    );
  }
}
