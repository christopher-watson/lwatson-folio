import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
// import Navbar from "./components/Navbar";
// import Login from "./containers/Login";
// import Logout from "./containers/Logout";
import "./App.css";

const App = () => (
  <Router>
    <div className='wrapper'>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route render={() => <h1 className="text-center mt-5">Page Not Found!</h1>} />
      </Switch>
    </div>
  </Router>
);

export default App;