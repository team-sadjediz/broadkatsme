import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";
import { setAuthorization } from "./firebase/firebase.sdk";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { CHAT_SERVER } from "./utils";

import io from "socket.io-client";

// redux:
import { connect } from "react-redux";
import {
  setUserAuth,
  updateCurrentUser,
  resetUserRedux,
  setSocket,
} from "./redux/user/user.actions";
import { resetRoomRedux } from "./redux/room/room.actions";

// custom components:
import Sidebar from "./components/sidebar/sidebar.component";
import Navbar from "./components/navbar/navbar.component";

// pages:
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import SearchPage from "./pages/search-page/search-page-v2.component";
import RoomPage from "./pages/room-page/room-page-v2.component";
import AboutPage from "./pages/about-page/about-page.component";
import CodeOfConductPage from "./pages/code-of-conduct-page/code-of-conduct-page.component";
import ContactPage from "./pages/contact-page/contact-page.component";
import UserProfilePage from "./pages/user-profile-page/user-profile-page.component";
import ResetPassPage from "./pages/reset-password-page/reset-password-page.component";
import ErrorPage from "./pages/error-page/error-page.component";

// custom styles:
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

const App = ({ socket, userAuth, ...props }) => {
  useEffect(() => {
    console.log("App mounted");
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      console.log("login listener started...", user);
      let newSocket = io(CHAT_SERVER);
      if (user) {
        console.log("initializing user");
        props.setSocket(newSocket);
        props.updateCurrentUser(user.uid);
        props.setUserAuth(user);
      } else {
        console.log("destroying user");
        newSocket.disconnect();
        props.resetRoomRedux();
        props.resetUserRedux();
      }
    });

    return () => {
      console.log("App unmounting");
      if (userAuth) {
        console.log("socket disconnecting...");
        socket.disconnect();
      }
      setSocket({ id: null });
      unsubscribeFromAuth();
      console.log("User logged out");
    };
  }, []);

  const authorize = async () => {
    let idToken = await userAuth.getIdToken(false);
    setAuthorization(idToken);
  };

  if (userAuth) {
    authorize();
  }

  // render() {

  // console.log(this.props.userAuth);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Sidebar>
            <Switch>
              {/* ROUTES BOTH LOGGED IN AND LOGGED OUT USERS GET: */}
              <Route exact path="/" component={LobbyPage} />
              <Route exact path="/lobby" component={LobbyPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/reset" component={ResetPassPage} />
              <Route
                exact
                path="/codeofconduct"
                component={CodeOfConductPage}
              />

              {/* ROUTES ONLY LOGGED IN USERS GETS: */}
              {userAuth && (
                <React.Fragment>
                  <Route exact path="/search" component={SearchPage} />
                  <Route path="/room/id=:id" component={RoomPage} />
                  <Route
                    path={`/userprofile/id=:id`}
                    component={UserProfilePage}
                  />
                </React.Fragment>
              )}

              {/* ALL OTHER ROUTES DEFAULT TO THE ERROR PAGE: */}
              <Route to="*" component={ErrorPage} />
            </Switch>
          </Sidebar>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
  // }
};

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  socket: user.socket,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAuth: (user) => dispatch(setUserAuth(user)),
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
  setSocket: (socketID) => dispatch(setSocket(socketID)),
  resetRoomRedux: () => dispatch(resetRoomRedux()),
  resetUserRedux: () => dispatch(resetUserRedux()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
