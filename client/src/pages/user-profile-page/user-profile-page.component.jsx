//Styles
import "./user-profile-page.style.scss";

// import React from 'react';
import React, { Component } from "react";
import axios from 'axios';

import { BASE_API_URL } from "../../utils";


class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "h2pO0PwXsycrNuOHKenZSAaKRl42"
        };
    }

    componentDidMount() {
        axios
        .get(`${BASE_API_URL}/userprofile/user-profile?uid=${this.state.uid}`)
        .then(userprofile =>
        {
            console.log(userprofile);
        })
        .catch(error => {
            console.log("error: " + error);
        })
    }
    render(){
        return(
            <div>hello, this is user</div>
        )
    }
}

export default UserProfilePage;