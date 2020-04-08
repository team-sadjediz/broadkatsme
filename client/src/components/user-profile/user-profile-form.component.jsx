import React, {Component} from 'react';


//components
import FormInput from "../../components/form-input/form-input.component";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';


const UserProfile = ({username, biography, tags, favorites, privacy, handleChange, handleSubmit}) => {

    return(
        <form class="profile-details-form">

        <FormInput
        label="Username"
        name="username"
        value={username}
        handleChange={handleChange}
        />

        <FormInput
        label="Biography"
        name="biography"
        value={biography}
        handleChange={handleChange}
        />

        <FormInput
        label="Tags *NOT UPDATING YET"
        name="tags"
        value={tags}
        // handleChange={this.handleChange}
        />

        <FormInput
        label="Movies"
        name="movies"
        value={favorites.movies}
        handleChange={handleChange}
        />

        <FormInput
        label="Music"
        name="music"
        value={favorites.music}
        handleChange={handleChange}
        />

        <FormInput
        label="Websites"
        name="websites"
        value={favorites.websites}
        handleChange={handleChange}
        />

        {/* <FormInput
        label="Privacy"
        name="privacy"
        value={this.state.privacy}
        handleChange={this.handleChange}
        /> */}
        <Switch
        checked={privacy}
        onChange={handleChange}
        color="primary"
        name="Privacy"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        />

        <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<CheckIcon />}
            onClick={handleSubmit}
        >
        Update
        </Button>
    </form>
    );

}

export default UserProfile;
class UserProfileForm extends React.Component {
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
            photoURL: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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
            // console.log(this.state.privacy);
        })
        .catch(error => {
            console.log("error: " + error);
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
        })
        .catch(error => {
            console.log("error: " + error);
        });
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

    render(){
        return(
            <div className="profile">
                <div className="profile-picture">
                    <img
                     src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${this.state.photoURL}`}
                    //  src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
                     />
                </div>
                <div className="profile-buttons">
                    <Fab className="edit-button" color="primary" aria-label="edit">
                        <EditIcon />
                    </Fab>
                    <label htmlFor="upload" for="upload">
                        <Fab
                        className="upload-button"
                        color="primary"
                        >
                            <AddAPhotoIcon />
                        </Fab>
                    </label>
                    <input
                        type="file"
                        id="upload"
                        name="profile_picture"
                        accept="image/png, image/jpeg"
                        onChange={this.handleUpload}
                    ></input>
                </div>
                <div className="profile-details">

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    // currentUser: state.user.currentUser,
    userAuth: state.user.userAuth
  });

export default connect(mapStateToProps)(UserProfileForm);