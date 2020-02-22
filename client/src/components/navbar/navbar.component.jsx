import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";

// components:
import CircleBtn from "../circle-btn/circle-btn.component";
import Poppity from "../poppity/poppity.component";
import NewRoom from "../new-room/new-room.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";
import LoginRegisterPanel from "../login-register-panel/login-register-panel.component";

// icons:
import { ReactComponent as NineDotIcon } from "../../assets/icons/nine-dots-solid.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as BarsIcon } from "../../assets/icons/bars-solid.svg";


import "./navbar.style.scss";

let rooms = [
  {
    id: 86,
    pic: "https://i.picsum.photos/id/1049/3900/3120.jpg"
  },
  {
    id: 16,
    pic: "https://i.picsum.photos/id/1049/3900/3120.jpg"
  },
  {
    id: 38,
    pic: "https://i.picsum.photos/id/1049/3900/3120.jpg"
  },
  {
    id: 19,
    pic: "https://i.picsum.photos/id/1049/3900/3120.jpg"
  }
];

const NavBar = ({ currentUser }) => (
  <div className="navbar-container">
    {/* LOGO: */}
    <div className="logo-section">
      {/* <div>{`${currentUser.uid} ${currentUser.email}`}</div> */}
      {/* <Link to="/login">
        <LogoHorizontal />
      </Link> */}

      <p>broadkats</p>
      <CircleBtn text="me"></CircleBtn>
    </div>

    {/* ROOM NAV */}
    <div className="room-nav">
      <Link to="/lobby">
        <CircleBtn className="room-nav-btn home-btn" icon={<NineDotIcon />} />
      </Link>
      <Link to="/search">
        <CircleBtn className="room-nav-btn search-btn" icon={<SearchIcon />} />
      </Link>
      <Poppity arrowGap="58" alignArrow="center" content={<NewRoom/>}>
        <CircleBtn
          className="room-nav-btn create-room-btn"
          icon={<PlusIcon />}
        ></CircleBtn>
      </Poppity>

      <div className="room-list-container">
        {rooms.map(room => (
          <Link to={`/room/id/${room.id}`}>
            <CircleBtn
              className="room-item-btn room-btn"
              bgImageUrl={room.pic}
            />
          </Link>
        ))}
      </div>
    </div>

    {/* SITE NAV */}
    <div className="site-nav">
      <Poppity arrowGap="58" alignArrow="right" content={<PageDropdown />}>
        {/* <CircleBtn className="more-pages-btn" icon={<BarsIcon />} /> */}
        <CircleBtn className="" icon={<BarsIcon />} />
      </Poppity>

      {/* <CircleBtn className="user-settings-btn" icon={<PeopleIcon />} />
      <CircleBtn
        className="logout-btn"
        icon={<XIcon />}
        onClick={() => auth.signOut()}
      /> */}
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(NavBar);
