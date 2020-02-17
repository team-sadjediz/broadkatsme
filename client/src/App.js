import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

// components:
import NavBar from "./components/navbar/navbar.component";

// pages:
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import RoomPage from "./pages/room-page/room-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import CodeOfConductPage from "./pages/code-of-conduct-page/code-of-conduct-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";

import "./App.scss";

import { Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log("componentDidMount/logged in:", this.state.currentUser);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log("logged out")
  }

  render() {
    return (
      <div className="App">
        {this.state.currentUser ? (
          <BrowserRouter>
            <NavBar currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path="/login" component={LoginRegisterPage} />
              <Route path="/lobby" component={LobbyPage} />
              <Route path="/room" component={RoomPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/codeofconduct" component={CodeOfConductPage} />
            </Switch>
          </BrowserRouter>
        ) : (
          <LoginRegisterPage></LoginRegisterPage>
        )}
      </div>
    );
  }
}

export default App;
