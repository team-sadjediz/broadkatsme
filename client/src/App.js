import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import RoomPage from "./pages/room-page/room-page.component";
import "./App.scss";

import { Link } from "react-router-dom";

class App extends Component {
  // Initialize state
  state = { name: "", age: "" };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/test")
      .then(res => res.json())
      .then(obj => this.setState({ name: obj.name, age: obj.age }));
  };

  render() {
    return (
      <div className="App">
        {console.log(this.state)}
        <BrowserRouter>
          {/* <NavBar /> */}
          <Link to="/">
            <h3>HOME</h3>
          </Link>
          <Link to="/login">
            <h3>LOGIN</h3>
          </Link>
          <Link to="/lobby">
            <h3>LOBBY</h3>
          </Link>
          <Link to="/room">
            <h3>ROOM</h3>
          </Link>
          <Switch>
            <Route exact path="/login" component={LoginRegisterPage} />
            <Route path="/lobby" component={LobbyPage} />
            <Route path="/room" component={RoomPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
