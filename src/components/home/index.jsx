import React, { Component } from "react";
import "./style_home.css";
import { Link } from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="header1">Genstem</h1>
        <div className="container1">
          <Link to={"/join"}>
            <button className="button1" type="button">
              Join
            </button>
          </Link>
          <Link to={'/create'}>
            <button className="button2" type="button">
              Create
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
