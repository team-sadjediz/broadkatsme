//Styles
import "./user-profile-page.style.scss";
// import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FormInput from "../../components/form-input/form-input.component";

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

// import React from 'react';
import React, { Component } from "react";
import axios from 'axios';

import { BASE_API_URL } from "../../utils";
import { FormGroup } from "@material-ui/core";


class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "h2pO0PwXsycrNuOHKenZSAaKRl42",
            username: "",
            profile: "",
            movies: "",
            websites: "",
            music: ""
            // uid: "5e5c7906a3a4ee0017b7a7a4"
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    }

    componentDidMount() {
        axios
        .get(`${BASE_API_URL}/userprofile/details/${this.state.uid}`)
        .then(result =>
        {
            console.log("success: ");
            console.log(result);
            this.setState({profile: result.data});
            this.setState({username: result.data.username});
            this.setState({movies: result.data.favorites.movies});
            this.setState({websites: result.data.favorites.websites});
            this.setState({music: result.data.favorites.music});
            // console.log(this.state.profile.favorites.movies);
        })
        .catch(error => {
            console.log("error: " + error);
        });
    }
    handleUpdateInfo(e) {
        // this.setState({username: e.target.value});
        axios
        .put(`${BASE_API_URL}/userprofile/edit/${this.state.uid}`,
        {
            username: this.state.username
                        
        })
        .then(result =>
        {
            console.log("success: ");
            console.log(result);
        })
        .catch(error => {
            console.log("error: " + error);
        });
    }
    handleUsername(e) {
        console.log(e);
        this.setState({username: e.target.value});
    }
    render(){
        return(
            <div className="profile">
                <div className="profile-picture">
                    <img
                     src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${this.state.profile.photoURL}`}
                    //  src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
                     />
                </div>
                <div className="profile-buttons">
                    <Fab color="primary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                </div>
                <div className="profile-details">
                    <form class="profile-details-form">

                        <FormInput
                        label="Username"
                        value={this.state.username}
                        handleChange={this.handleUsername}
                        />

                        <FormInput
                        label="Biography"
                        value={this.state.profile.biography}
                        />

                        <FormInput
                        label="Tags"
                        value={this.state.profile.tags}
                        />

                        <FormInput
                        label="Movies"
                        value={this.state.movies}
                        />

                        <FormInput
                        label="Music"
                        value={this.state.music}
                        />

                        <FormInput
                        label="Websites"
                        value={this.state.websites}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            // className={classes.button}
                            startIcon={<CheckIcon />}
                            onClick={this.handleUpdateInfo}
                        >
                        Update
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfilePage;