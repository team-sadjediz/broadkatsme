import React, { useState, useEffect } from "react";
import { BASE_API_URL } from "../../utils";

import "./developer.styles.scss";

const Developer = ({imageSrc, name, location, content, github, linkedin}) => {
//   const [varA, setVarA] = useState("");
//   const [varB, setVarB] = useState([]);

//   useEffect(() => {
//     // same as componentDidMount() (not really but sorta; read up on this)
//   }, []);

  return (
    <div className="developer-container">
        <div className="developer">
            <div className="developer-picture">
                <img
                className="dev-pic"
                src={imageSrc}
                //  src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
                />
                <div className="links">
                    <a href={github} target="_blank">
                        <img
                            className="github"
                            src="https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png"
                        />
                    </a>
                    <a href={linkedin} target="_blank">
                        <img
                            className="linkedin"
                            src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/linkedin_circle-512.png"
                        />
                    </a>
                </div>
            </div>
            <div className="developer-name">
                {name}
            </div>
            <div className="developer-location">
                {location}
            </div>
            <div className="developer-content">
                {content}
            </div>
        </div>
    </div>
  );
};

export default Developer;