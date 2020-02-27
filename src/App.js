import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Home from "./routes/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Join from "./routes/join";
import Create from './routes/create';
import DeveloperTools from "./components/developer_tools";
import DevToolBar from './components/developer_tools/toolbar.jsx';
import Host from './routes/HostApp';
import Logout from './Network/Logout';

function App() {
  return (
    <Router>
    <DevToolBar />
      <div className="App">
        <Switch>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path={'/host'}>
            <Host />
          </Route>
          <Route path="/dev">
            <DeveloperTools />
          </Route>
          <Route path={'/app/logout'} >
            <Logout />
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
