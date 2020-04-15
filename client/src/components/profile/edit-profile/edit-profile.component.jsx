
// import React from 'react';
import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { BASE_API_URL } from "../../../utils";

//Styles
import "./edit-profile.style.scss";
// import { makeStyles } from '@material-ui/core/styles';

//icons
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";
import LockIcon from '@material-ui/icons/Lock';

//components
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Tag from "../../tag/tag.component";
import FormInput from "../../form-input/form-input.component";

import MessagePop from "../../message-pop/message-pop.component";


class EditProfile extends React.Component{
    // let profileTags = props.tags;
    constructor(props) {
        super(props);
    }

    render() {
        let tags = this.props.tags.map((tag) => {
            return (
                <Tag
                key={tag}
                type="remove-profile"
                text={tag}
                onChangeTag={this.props.onChangeTag}
                roomID={this.props.match.params.id}
                uid={this.props.userAuth.uid}
                ></Tag>
            );
            });
            let addTag = (
            <Tag
                type="add-profile"
                roomID={this.props.match.params.id}
                onChangeTag={this.props.onChangeTag}
                uid={this.props.userAuth.uid}
            ></Tag>
            );
        return(
            <form class="profile-details-form">
            <FormInput
            label="Username"
            name="username"
            value={this.props.username}
            handleChange={this.props.handleChange}
            />

            <FormInput
            label="Biography"
            name="biography"
            value={this.props.biography}
            handleChange={this.props.handleChange}
            />

            {addTag}
            {tags}

            <FormInput
            label="Movies"
            name="movies"
            value={this.props.movies}
            handleChange={this.props.handleChange}
            />

            <FormInput
            label="Music"
            name="music"
            value={this.props.music}
            handleChange={this.props.handleChange}
            />

            <FormInput
            label="Websites"
            name="websites"
            value={this.props.websites}
            handleChange={this.props.handleChange}
            />

            {/* <FormInput
            label="Privacy"
            name="isPrivate"
            value={state.isPrivate}
            handleChange={handleChange}
            /> */}

            <Button
                variant="contained"
                color="primary"
                // className={classes.button}
                startIcon={<CheckIcon />}
                onClick={this.props.handleSubmit}
            >
            Update
            </Button>
            <Button
                variant="contained"
                color="secondary"
                // className={classes.button}
                startIcon={<CloseIcon />}
                onClick={this.props.handleCancel}
            >
            Cancel
            </Button>
            </form>
        );
    }
}

export default EditProfile;