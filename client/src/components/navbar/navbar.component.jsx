import React, { useReducer } from "react";
import { Link } from "react-router-dom";

import CircleBtn from "../circle-btn/circle-btn.component";
// import LogoHorizontal from "../logo/logo-horizontal.component";

import { ReactComponent as NineDotIcon } from "../../assets/icons/nine-dots-solid.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as BarsIcon } from "../../assets/icons/bars-solid.svg";
import { ReactComponent as PeopleIcon } from "../../assets/icons/user-circle-solid.svg";
import { ReactComponent as XIcon } from "../../assets/icons/times-solid.svg";

import "./navbar.style.scss";

let rooms = [
  {
    id: 86,
    pic: "https://picsum.photos/id/1012/3973/2639"
  },
  {
    id: 16,
    pic: "https://picsum.photos/id/101/2621/1747"
  },
  {
    id: 38,
    pic: "https://picsum.photos/id/238/200/300"
  },
  {
    id: 19,
    pic: "https://picsum.photos/id/237/200/300"
  }
];

const NavBar = () => (
  <div className="navbar-container">
    {/* LOGO: */}
    {/* <div className="logo-section">
      <Link to="/login">
        <LogoHorizontal />
      </Link>
    </div> */}

    {/* ROOM NAV */}
    <div className="room-nav">
      <Link to="/lobby">
        <CircleBtn
          className="room-nav-btn home-btn circle-hover"
          icon={<NineDotIcon />}
        />
      </Link>
      <Link to="/search">
        <CircleBtn
          className="room-nav-btn search-btn circle-hover"
          icon={<SearchIcon />}
        />
      </Link>
      <Link to="/create">
        <CircleBtn
          className="room-nav-btn create-room-btn circle-hover"
          icon={<PlusIcon />}
        ></CircleBtn>
      </Link>

      {rooms.map(room => (
        <Link to={`/room/id/${room.id}`}>
          <CircleBtn
            className="room-nav-btn room-btn circle-hover"
            bgImageUrl={room.pic}
          />
        </Link>
      ))}
    </div>

    {/* SITE NAV */}
    <div className="site-nav">
      <CircleBtn className="more-pages-btn" icon={<BarsIcon />} />
      <CircleBtn className="user-settings-btn" icon={<PeopleIcon />} />
      <CircleBtn className="logout-btn" icon={<XIcon />} />
    </div>
  </div>
);

export default NavBar;
