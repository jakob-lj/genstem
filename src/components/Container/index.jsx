import "./css.css";
import React, { Component } from "react";

export default function Container(props) {
  return <div className={"container"}>{props.children}</div>;
}
