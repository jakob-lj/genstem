import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Join from "./components/join";
import Create from './components/create';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
