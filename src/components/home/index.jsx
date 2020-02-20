import React, { Component } from "react";
import "./style_home.css";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="header1">Genstem</h1>
        <div className="container1">
          <button className="button1" type="button">
            Join
          </button>
          <button className="button2" type="button">
            Create
          </button>
        </div>
      </div>
    );
  }
}
