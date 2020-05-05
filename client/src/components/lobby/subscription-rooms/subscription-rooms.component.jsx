//react and routing
import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../../utils";
//SVGs and Icons
import { ReactComponent as PetAdoption } from "../../../assets/graphics/undraw_pet_adoption_2qkw.svg";

//components
import Carousel from "../../../components/carousel/carousel.component";
import CardTwo from "../../../components/card/card-two.component";
import FormInput from "../../../components/form-input/form-input.component";
import Grid from "@material-ui/core/Grid";
//styles
import "./subscription-rooms.style.scss";

const SubscribedRoomsPage = ({userAuth, subscribedRooms}) => {
  const [search, setSearch] = useState("");
  const [userRooms, setUserRooms] = useState(subscribedRooms.filter((room) => room.ownerID !== userAuth.uid));

  useEffect(() => {
    let filteredUserRooms = userRooms.filter((room) => {
          for (let tag = 0; tag < room.tags.length; tag++) {
            if (room.tags[tag].toLowerCase().indexOf(search.toLowerCase()) !== -1)
                return true;
          }
          if (room.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            return true;
          return false;
      });
    setUserRooms(filteredUserRooms);
  }, [search]);

  useEffect(() => {}, [subscribedRooms]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div className="subscribed-rooms-page-container">
    <FormInput
        className="search-input"
        label="search"
        value={search}
        handleChange={handleSearch.bind(this)}
    />
    <Grid container spacing={1} className="subscribed-rooms-container">
    {userRooms.map(
        (property, index) => (
            <Grid item xs={4} zeroMinWidth>
                <CardTwo
                    key={index}
                    style={{ "margin": "10px" }}
                    uid={userAuth.uid}
                    roomID={property.roomID}
                    name={property.name}
                    tags={property.tags}
                    thumbnailUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}`}
                    unsubscribe
                    // invite
                    // chat
                    // unsubscribe={this.handleUnsubscribe}
                ></CardTwo>
            </Grid>
            )
        )}
    </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
    // currentUser: state.user.currentUser,
    userAuth: state.user.userAuth,
    subscribedRooms: state.room.subscribedRooms,
  });

export default connect(mapStateToProps)(SubscribedRoomsPage);

