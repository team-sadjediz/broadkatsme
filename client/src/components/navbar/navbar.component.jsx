import React, { useReducer } from "react";
import { Link } from "react-router-dom";

// components:
import CircleBtn from "../circle-btn/circle-btn.component";
import Poppity from "../poppity/poppity.component";
import NewRoom from "../new-room/new-room.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";

// icons:
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
      <Poppity arrowGap="48" alignArrow="center" content={<NewRoom></NewRoom>}>
        <CircleBtn
          className="room-nav-btn create-room-btn circle-hover"
          icon={<PlusIcon />}
        ></CircleBtn>
      </Poppity>

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
      <Poppity arrowGap="48" alignArrow="right" content={<PageDropdown />}>
        <CircleBtn className="more-pages-btn" icon={<BarsIcon />} />
      </Poppity>

      <CircleBtn className="user-settings-btn" icon={<PeopleIcon />} />
      <CircleBtn className="logout-btn" icon={<XIcon />} />
    </div>
  </div>
);

export default NavBar;
