import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";
import { Link } from "react-router-dom";


// redux stuff:
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

// components:
import NavBar from "./components/navbar/navbar.component";

// pages:
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import RoomPage from "./pages/room-page/room-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import CodeOfConductPage from "./pages/code-of-conduct-page/code-of-conduct-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";

import ResetPassPage from "./pages/reset-password-page/reset-password-page.component";
import "./App.scss";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.props.setCurrentUser(user);
      console.log("componentDidMount - logged in1:", this.props.currentUser);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log("logged out");
  }

  render() {
    return (
      <div className="App">
        {this.props.currentUser ? (
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/login" render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<LoginRegisterPage/>)} />
              <Route path="/lobby" component={LobbyPage} />
              <Route path="/room" component={RoomPage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/codeofconduct" component={CodeOfConductPage} />
            </Switch>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LoginRegisterPage} />
              <Route exact path="/login" component={LoginRegisterPage} />
              <Route path="/reset" component={ResetPassPage} />
            </Switch>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
