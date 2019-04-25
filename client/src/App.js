import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
// import Upload from "./containers/Upload";
import Edit from "./containers/Edit";
import "./App.css";

const App = () => (
  <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit" component={Edit} />
        <Route component={Home} />
      </Switch>
  </Router>
);

export default App;