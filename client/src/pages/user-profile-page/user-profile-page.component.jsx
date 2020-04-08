
// import React from 'react';
import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

//Styles
import "./user-profile-page.style.scss";
// import { makeStyles } from '@material-ui/core/styles';

//icons
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import IconButton from "@material-ui/core/IconButton";

//components
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Tag from "../../components/tag/tag.component";
import FormInput from "../../components/form-input/form-input.component";
import Profile from "../../components/profile/profile.component";
import Carousel from "../../components/carousel/carousel.component";
import MessagePop from "../../components/message-pop/message-pop.component";


class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.userAuth.uid,
            username: "",
            biography: "",
            privacy: "",
            tags: "",
            movies: "",
            websites: "",
            music: "",
            photoURL: "",
            subscribedRooms: "",
            ownedRooms: "",
            feedback: false,
            feedbackMessage: "",
            isEditing: false,
            isUser: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentDidMount() {
        axios
        .get(`${BASE_API_URL}/userprofile/details/${this.state.uid}`)
        .then(result =>
        {
            console.log("success: ");
            console.log(result);
            // this.setState({profile: result.data});
            this.setState({username: result.data.username});
            this.setState({photoURL: result.data.photoURL});
            this.setState({biography: result.data.biography});
            this.setState({tags: result.data.tags});
            this.setState({movies: result.data.favorites.movies});
            this.setState({websites: result.data.favorites.websites});
            this.setState({music: result.data.favorites.music});
            this.setState({privacy: result.data.privacy});
            // console.log(this.state.profile.favorites.movies);
            // console.log(this.props.userAuth.uid);
        })
        .catch(error => {
            console.log("error: " + error);
        });

        axios
        .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
        .then(rooms => {
          this.setState({ subscribedRooms: rooms.data });
        })
        .catch(error => {
          console.error(error);
        });

        axios
            .get(`${BASE_API_URL}/home/rooms/?size=8`)
            .then(rooms => {
            this.setState({ ownedRooms: rooms.data });
            })
            .catch(error => {
            console.error(error);
            });
    }
    
    handleSubmit(e) {
        // this.setState({username: e.target.value});
        const details = {
            username: this.state.username,
            biography: this.state.biography,
            movies: this.state.movies,
            websites: this.state.websites,
            music: this.state.music
        };
        console.log(details);
        axios
        .put(`${BASE_API_URL}/userprofile/edit/${this.state.uid}`, null,
        {
            params: details   
        })
        .then(result =>
        {
            console.log("success: ");
            console.log(result);
            this.setState({isEditing : false, feedback: true, feedbackMessage: "Updated Profile"});
        })
        .catch(error => {
            console.log("error: " + error);
        });

        setTimeout(() => {
            this.setState({feedback: false, feedbackMessage: ""})
          }, 3000);

    }

    handleCancel(e) {
        this.setState({isEditing: false});
    }

    handleChange = e => {
        // console.log(e);
        // this.setState({username: e.target.value});
        const { value, name } = e.target;
        // console.log(e.target);
        this.setState({ [name]: value });
    }

    handleChangePhoto = photoURL => {
        console.log(this.state.photoURL);
        console.log(photoURL);
        this.setState({ photoURL: photoURL });
      };

    handleUpload = async file => {
        const photo = file.target.files[0];
        console.log(file.target.files);
        const formData = new FormData();
        formData.append("uid", this.state.uid);
        formData.append("image", photo);
        const config = {
            headers: {
            "content-type": "multipart/form-data"
            }
        };

        await axios
            .put(
            `${BASE_API_URL}/userprofile/upload-profile-image/${this.state.uid}`,
            formData,
            config
            )
            .then(res => {
            console.log(res);
            this.handleChangePhoto(res.data);
            this.setState({photoURL: res.data});
            })
            .catch(error => console.error(error));
          
    }

    handleEditClick = e => {
        this.setState({isEditing : true});
    }


    render(){
        return(
            <div className="profile">
            <MessagePop pop={this.state.feedback} message={this.state.feedbackMessage}/>
            <div className="profile-picture">
                <img
                src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${this.state.photoURL}`}
                //  src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
                />
            </div>
            {!this.state.isEditing && 
            <div className="username-title">
                {this.state.username}
                <div className="bio">{this.state.biography}</div>
            </div>
            }
            <div className="profile-buttons">
                {!this.state.isEditing && !this.state.isUser && 
                    <Tooltip title='Send Friend Request' placement='right'>
                    <Fab className="friend-button" color="primary" aria-label="edit" onClick={this.handleAddFriend}>
                        <PersonAddIcon />
                    </Fab>
                    </Tooltip>
                }
                {!this.state.isEditing && this.state.isUser &&
                    <Tooltip title='Edit Profile' placement='right'>
                    <Fab className="edit-button" color="primary" aria-label="edit" onClick={this.handleEditClick}>
                        <EditIcon />
                    </Fab>
                    </Tooltip>
                }
                {this.state.isEditing &&
                <div>
                <label htmlFor="upload" for="upload">
                    <Fab className="upload-button" color="primary" component="span">
                        <AddAPhotoIcon />
                    </Fab>
                </label>
                <input
                    type="file"
                    id="upload"
                    name="profile_picture"
                    accept="image/png, image/jpeg"
                    onChange={this.handleUpload}
                />
                </div>
                }
            </div>
            {!this.state.isEditing &&
                    <div className="profile-show">
                            <div className="profile-favorites">
                                <Profile
                                movies={this.state.movies}
                                music={this.state.music}
                                website={this.state.websites}
                                />
                            </div>
                            <div className="profile-biography">
                                <div className="profile-tags">
                                {this.state.tags.length !== 0 && this.state.tags.map((value, index) => {
                                    return <Tag type="label" text={value} />;
                                })}
                                </div>
                                
                            </div>
                            <div className="subscribed-rooms">
                                <div className="subscribed-title">Subscribed Rooms</div>
                                <Carousel
                                    properties={this.state.subscribedRooms}
                                />
                            </div>
                            <div className="owned-rooms">
                            <div className="owned-title">Owned Rooms</div>
                                <Carousel
                                    properties={this.state.ownedRooms}
                                />
                            </div>
                        {/* </div> */}
                    </div>
                    }

                    {this.state.isEditing &&
                        <form class="profile-details-form">
                            <FormInput
                            label="Username"
                            name="username"
                            value={this.state.username}
                            handleChange={this.handleChange}
                            />

                            <FormInput
                            label="Biography"
                            name="biography"
                            value={this.state.biography}
                            handleChange={this.handleChange}
                            />

                            <FormInput
                            label="Tags *NOT UPDATING YET"
                            name="tags"
                            value={this.state.tags}
                            // handleChange={this.handleChange}
                            />

                            <FormInput
                            label="Movies"
                            name="movies"
                            value={this.state.movies}
                            handleChange={this.handleChange}
                            />

                            <FormInput
                            label="Music"
                            name="music"
                            value={this.state.music}
                            handleChange={this.handleChange}
                            />

                            <FormInput
                            label="Websites"
                            name="websites"
                            value={this.state.websites}
                            handleChange={this.handleChange}
                            />

                            {/* <FormInput
                            label="Privacy"
                            name="privacy"
                            value={this.state.privacy}
                            handleChange={this.handleChange}
                            /> */}

                            <Button
                                variant="contained"
                                color="primary"
                                // className={classes.button}
                                startIcon={<CheckIcon />}
                                onClick={this.handleSubmit}
                            >
                            Update
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                // className={classes.button}
                                startIcon={<CloseIcon />}
                                onClick={this.handleCancel}
                            >
                            Cancel
                            </Button>
                        </form>

                    }
                </div>
        )
    }
}
const mapStateToProps = state => ({
    // currentUser: state.user.currentUser,
    userAuth: state.user.userAuth
  });

export default connect(mapStateToProps)(UserProfilePage);

