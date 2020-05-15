// import React from 'react';
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

//Styles
import "./user-profile-page.style.scss";
// import { makeStyles } from '@material-ui/core/styles';

//icons
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";

//components
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Tag from "../../components/tag/tag.component";
import FormInput from "../../components/form-input/form-input.component";
import Favorites from "../../components/profile/favorites/favorites.component";
import EditProfile from "../../components/profile/edit-profile/edit-profile.component";
import Carousel from "../../components/carousel/carousel.component";
import MessagePop from "../../components/message-pop/message-pop.component";
import Divider from "@material-ui/core/Divider";

class UserProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.id,
      username: "",
      biography: "",
      isPrivate: true,
      tags: [],
      movies: "",
      websites: "",
      music: "",
      photoURL: "",
      subscribedRooms: "",
      ownedRooms: "",
      isEditing: false,
      isUser: false,
      userAuth: this.props.userAuth.uid,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePhoto = this.handleChangePhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    // console.log("propstata", this.props.match);

    // console.log("propstata", this.props.match.params.id);

    this.validateView(this.props.match.params.id);
    // console.log('private', this.state.isPrivate);
    // console.log('is user', this.state.isUser);
  }

  //component is not remouonting so this is just receiving new props
  componentWillReceiveProps(nextProps) {
    this.validateView(nextProps.match.params.id);
  }

  validateView = async (data) => {
    // this.setState({uid: data});
    await axios
      .get(`${BASE_API_URL}/userprofile/details/${this.state.uid}`)
      .then((result) => {
        // console.log(data);
        // console.log(this.props.userAuth.uid);
        this.setState({ uid: data });
        if (this.state.uid === this.props.userAuth.uid) {
          this.setState({ isUser: true });
        }

        this.setState({ isPrivate: result.data.privacy });
        this.setState({ username: result.data.username });
        this.setState({ photoURL: result.data.photoURL });
        this.setState({ biography: result.data.biography });

        if (!this.state.isPrivate || this.state.isUser) {
          this.setState({ tags: result.data.tags });
          this.setState({ movies: result.data.favorites.movies });
          this.setState({ websites: result.data.favorites.websites });
          this.setState({ music: result.data.favorites.music });
        }
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    if (!this.state.isPrivate || this.state.isUser) {
      await axios
        .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
        .then((rooms) => {
          this.setState({ subscribedRooms: rooms.data.filter((room) => room.ownerID !== this.state.userAuth) });
          this.setState({ ownedRooms: rooms.data.filter((room) => room.ownerID === this.state.userAuth) });
          console.log(rooms.data);
        })
        .catch((error) => {
          console.error(error);
        });

      // await axios
      //   .get(`${BASE_API_URL}/home/rooms/?size=8`)
      //   .then((rooms) => {
      //     this.setState({ ownedRooms: rooms.data });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
    // console.log('private', this.state.isPrivate);
    // console.log('is user', this.state.isUser);
  };

  handleSubmit = (e) => {
    // this.setState({username: e.target.value});
    const details = {
      username: this.state.username,
      biography: this.state.biography,
      movies: this.state.movies,
      websites: this.state.websites,
      music: this.state.music,
    };
    console.log(details);
    axios
      .put(`${BASE_API_URL}/userprofile/edit/${this.state.uid}`, null, {
        params: details,
      })
      .then((result) => {
        console.log("success: ");
        console.log(result);
        this.setState({
          isEditing: false,
          feedback: true,
          feedbackMessage: "Updated Profile",
        });
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    setTimeout(() => {
      this.setState({ feedback: false, feedbackMessage: "" });
    }, 3000);
  };

  handleCancel = (e) => {
    this.setState({ isEditing: false });
  };

  handleChange = (e) => {
    // console.log(e);
    // this.setState({username: e.target.value});
    const { value, name } = e.target;
    // console.log(e.target);
    this.setState({ [name]: value });
  };

  handleChangePhoto = (photoURL) => {
    console.log(this.state.photoURL);
    console.log(photoURL);
    this.setState({ photoURL: photoURL });
  };

  handleUpload = async (file) => {
    const photo = file.target.files[0];
    console.log(file.target.files);
    const formData = new FormData();
    formData.append("uid", this.state.uid);
    formData.append("image", photo);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    await axios
      .put(
        `${BASE_API_URL}/userprofile/upload-profile-image/${this.state.uid}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        this.handleChangePhoto(res.data);
        this.setState({ photoURL: res.data });
      })
      .catch((error) => console.error(error));
  };

  handleEditClick = (e) => {
    this.setState({ isEditing: true });
  };

  onChangeTag = (tags) => {
    this.setState({ tags: tags });
  };

  render() {
    // let tags = this.state.tags.map((tag) => {
    //     return (
    //         <Tag
    //         key={tag}
    //         type="remove-profile"
    //         text={tag}
    //         onChangeTag={this.onChangeTag}
    //         // roomID={this.props.match.params.id}
    //         uid={this.props.userAuth.uid}
    //         ></Tag>
    //     );
    //     });
    //     let addTag = (
    //     <Tag
    //         type="add-profile"
    //         // roomID={this.props.match.params.id}
    //         onChangeTag={this.onChangeTag}
    //         uid={this.props.userAuth.uid}
    //     ></Tag>
    //     );
    return (
      <div className="profile">
        <MessagePop
          className="profile-message-pop"
          pop={this.state.feedback}
          message={this.state.feedbackMessage}
        />
        {!this.state.isEditing && (this.state.isUser || !this.state.isPrivate) && (
          <div className="profile-show">
            <div className="profile-user-information">
              {/* <div className="profile-picture"> */}
              <img
                src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${this.state.photoURL}`}
                //  src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
              />
              {/* </div> */}
              <div className="profile-user-information-header">
                {!this.state.isEditing && (
                  <div className="username-title">{this.state.username}</div>
                )}
                <div className="bio">{this.state.biography}</div>
                <div className="profile-buttons">
                  {!this.state.isEditing && !this.state.isUser && (
                    <Tooltip title="Send Friend Request" placement="right">
                      <Fab
                        className="friend-button"
                        color="primary"
                        aria-label="edit"
                        onClick={this.handleAddFriend}
                      >
                        <PersonAddIcon />
                      </Fab>
                    </Tooltip>
                  )}
                  {!this.state.isEditing && this.state.isUser && (
                    <Tooltip title="Edit Profile" placement="right">
                      <Fab
                        className="edit-button"
                        color="primary"
                        aria-label="edit"
                        onClick={this.handleEditClick}
                      >
                        <EditIcon />
                      </Fab>
                    </Tooltip>
                  )}
                </div>
                <div className="profile-favorites">
                  <Favorites
                    movies={this.state.movies}
                    music={this.state.music}
                    website={this.state.websites}
                  />
                </div>
                <div className="profile-tags">
                  {this.state.tags.length !== 0 &&
                    this.state.tags.map((value, index) => {
                      return <Tag type="label" text={value} />;
                    })}
                </div>
              </div>
            </div>
            <div className="profile-user-carousels">
              <div className="subscribed-title">Subscribed Rooms</div>
              <Carousel properties={this.state.subscribedRooms} />
              <Divider />
              <div className="owned-title">Owned Rooms</div>
              <Carousel properties={this.state.ownedRooms} />
              <Divider />
            </div>
            {/* </div> */}
          </div>
        )}
        {!this.state.isEditing &&
          !(this.state.isUser || !this.state.isPrivate) && (
            <div className="private-user">
              <LockIcon className="private-icon" />
              <div className="private-text">Sorry! This User is Private!</div>
            </div>
          )}
        {this.state.isEditing && (
          // <EditProfile
          //     className="profile-details-form"
          //     props={this.state}
          //     tags={this.state.tags}
          //     handleChange={this.handleChange}
          //     handleSubmit={this.handleSubmit}
          //     handleCancel={this.handleCancel}
          // />
          <form class="profile-details-form">
            <div className="profile-details-picture-preview">
              Current Profile Image
              <img
                src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${this.state.photoURL}`}
              />
              <span id="note">
                ** Note: This image upload will be saved irregardless if update
                has been confirmed. **
              </span>
            </div>

            <label
              htmlFor="upload"
              for="upload"
              className="profile-details-form-upload"
            >
              {/* <AddAPhotoIcon /> */}
              <span>Upload Your New File:</span>
              <input
                type="file"
                id="upload"
                name="profile_picture"
                accept="image/png, image/jpeg"
                onChange={this.handleUpload}
              />
            </label>

            <FormInput
              className="profile-details-form-input"
              label="Username"
              name="username"
              value={this.state.username}
              handleChange={this.handleChange}
            />

            <FormInput
              className="profile-details-form-input"
              label="Biography"
              name="biography"
              value={this.state.biography}
              handleChange={this.handleChange}
            />

            {/* {addTag}
                {tags} */}

            <FormInput
              className="profile-details-form-input"
              label="Movies"
              name="movies"
              value={this.state.movies}
              handleChange={this.handleChange}
            />

            <FormInput
              className="profile-details-form-input"
              label="Music"
              name="music"
              value={this.state.music}
              handleChange={this.handleChange}
            />

            <FormInput
              className="profile-details-form-input"
              label="Websites"
              name="websites"
              value={this.state.websites}
              handleChange={this.handleChange}
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
        )}
        {/* </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  // currentUser: state.user.currentUser,
  userAuth: state.user.userAuth,
});

export default connect(mapStateToProps)(UserProfilePage);
