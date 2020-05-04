import React from "react";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils";

import "./confirmation.style.scss";

//custom components
import CustomButton from "../custom-button/custom-button.component";


const Confirmation = ({onClick, roomName, roomID, handleYes, subscribe, 
    closeComponent = () => {
    return;
    },
    ...otherProps}) => {
//   const [varA, setVarA] = useState("");
//   const [varB, setVarB] = useState([]);

//   useEffect(() => {
//     // same as componentDidMount() (not really but sorta; read up on this)
//   }, []);
const handleClose = async (e) => {
    e.preventDefault();
    closeComponent();
}

const handleConfirmation = async (e) => {
    // e.preventDefault();
    handleYes();
    // closeComponent();
}

  return (
  <div className="confirmation-container">
  { subscribe ?
    <div className="confirmation-message">
        Are you sure you want to subscribe to {roomName}?
    </div> :     
    <div className="confirmation-message">
        Are you sure you want to unsubscribe to {roomName}?
    </div>
  }
    <div className="confirmation-buttons">
    <Link to={`/room/id=${roomID}`} >
        <CustomButton
        className="yes-button"
        onClick={handleConfirmation}
        >
            Yes
        </CustomButton>
    </Link>
        <CustomButton
        className="no-button"
        onClick={closeComponent}
        >
            No
        </CustomButton>
    </div>
  </div>);
};

export default Confirmation;

