import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Join from "./components/join";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/create"></Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
