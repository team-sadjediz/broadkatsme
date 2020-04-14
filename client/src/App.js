import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";

// import axios from "axios";

import { setAuthorization } from "./firebase/firebase.sdk";
// import { BASE_API_URL } from "./utils";

// redux:
import { connect } from "react-redux";

import {
  setUserAuth,
  updateCurrentUser,
  resetUserRedux,
} from "./redux/user/user.actions";

import { resetRoomRedux } from "./redux/room/room.actions";

// custom components:
import CustomDrawer from "./components/custom-drawer/custom-drawer.component";
// import ButtonAppBar from "./components/navbar-mui/navbar-mui.component";
import Navbar from "./components/navbar/navbar.component";
// import Drawer from "@material-ui/core/Drawer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import NewRoom from "./components/new-room/new-room.component";

// pages:
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import SearchPage from "./pages/search-page/search-page.component";
import RoomPage from "./pages/room-page/room-page.component";
import AboutPage from "./pages/about-page/about-page.component";
import CodeOfConductPage from "./pages/code-of-conduct-page/code-of-conduct-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";
import UserProfilePage from "./pages/user-profile-page/user-profile-page.component";
import ResetPassPage from "./pages/reset-password-page/reset-password-page.component";

// import Test from "./components/test-component/test.component";
// import Chat from "./components/chat/chat.component";

import "./App.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3a4660",
    },
    secondary: {
      main: "#ef5350",
    },
  },
  status: {
    danger: "orange",
  },
  typography: {
    fontFamily: [
      '"Karla"',
      "Roboto",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
    ].join(","),
  },
  mixins: {
    toolbar: {
      minHeight: 64, // sets the navbar height in pixels
    },
  },
});

console.log("MUI theme:", theme);

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("App mounted");
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("resetting room redux");
        // THIS IS WHERE WE CLEAN UP ALL REDUX VARIABLES AFTER A USER LOGS OUT
        // THIS IS WHERE WE CLEAN UP ALL REDUX VARIABLES AFTER A USER LOGS OUT
        // THIS IS WHERE WE CLEAN UP ALL REDUX VARIABLES AFTER A USER LOGS OUT
        this.props.resetRoomRedux();
        this.props.resetUserRedux();
        // this.props.setUserAuth(user);
      } else {
        this.props.updateCurrentUser(user.uid);
        this.props.setUserAuth(user);
      }
    });
  }

  componentWillUnmount() {
    console.log("App unmounting");
    this.unsubscribeFromAuth();
    console.log("User logged out");
  }

  async authorize() {
    let idToken = await this.props.userAuth.getIdToken(false);
    setAuthorization(idToken);
  }

  render() {
    if (this.props.userAuth) {
      this.authorize();
    }
    // console.log(this.props.userAuth);
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {this.props.userAuth ? (
            <BrowserRouter>
              {/* <ButtonAppBar /> */}
              <Navbar />
              <CustomDrawer>
                <Switch>
                  <Route
                    exact
                    path="/login"
                    render={() =>
                      this.props.userAuth ? (
                        <Redirect to="/" />
                      ) : (
                        <LoginRegisterPage />
                      )
                    }
                  />
                  {/* <Route path="/lobby" component={Chat} /> */}
                  <Route path="/lobby" component={LobbyPage} />
                  <Route path="/search" component={SearchPage} />
                  <Route path="/room/id=:id" component={RoomPage} />
                  <Route path="/about" component={AboutPage} />
                  <Route path="/contact" component={ContactPage} />
                  <Route path="/codeofconduct" component={CodeOfConductPage} />
                  <Route path="/userprofile" component={UserProfilePage} />
                </Switch>
              </CustomDrawer>
            </BrowserRouter>
          ) : (
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={LoginRegisterPage} />
                <Route exact path="/login" component={LoginRegisterPage} />
                <Route path="/reset" component={ResetPassPage} />
                <Route path="/" component={LoginRegisterPage} />
              </Switch>
            </BrowserRouter>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
  resetRoomRedux: () => dispatch(resetRoomRedux()),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
