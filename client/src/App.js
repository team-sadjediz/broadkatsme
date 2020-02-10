import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar.component";
import LoginRegisterPage from "./pages/login-register-page/login-register-page.component";
import LobbyPage from "./pages/lobby-page/lobby-page.component";
import RoomPage from "./pages/room-page/room-page.component";
import "./App.scss";

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/login" component={LoginRegisterPage} />
          <Route path="/lobby" component={LobbyPage} />
          <Route path="/room" component={RoomPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
