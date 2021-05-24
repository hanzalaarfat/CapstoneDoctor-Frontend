import React from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          {/* <PrivateRoute path="/logout" component={Logout} /> */}
          <PrivateRoute path="/appointment" component={Appointment} />

          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
