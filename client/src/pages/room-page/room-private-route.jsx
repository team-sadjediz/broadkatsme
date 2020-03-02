import React, { Component } from "react";

import axios from "axios";
import { BASE_API_URL } from "../../utils";

import { Route, Redirect } from "react-router-dom";

class RoomPrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validatedRoom: null
    };
  }

  async componentDidMount() {
    await axios
      .get(`${BASE_API_URL}/room/find-room`, {
        params: { "roomID": this.props.computedMatch.params.id }
      })
      .then(res => {
        this.setState({ validatedRoom: true });
        console.log("true");
        //   return true;
      })
      .catch(error => {
        this.setState({ validatedRoom: false });
        console.log("false");
        //   return false;
      });
  }

  render() {
    const { component: Component, ...otherProps } = this.props;
    if (this.state.validatedRoom == null) {
      return <div> LOADING </div>;
    } else {
      console.log(this.state.validatedRoom);
      return (
        <Route
          {...otherProps}
          render={props =>
            this.state.validatedRoom ? (
              <Component {...props} />
            ) : (
              <Redirect to="/lobby" />
            )
          }
        />
      );
    }
  }
}

export default RoomPrivateRoute;
