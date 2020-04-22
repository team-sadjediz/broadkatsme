// import React, { useState, useEffect } from "react";

// // custom components:
// // import LogIn from "../login/login.component";
// // import Register from "../register/register.component";
// import LoginRegisterPanel from "../login-register-panel/login-register-panel.component";

// import "./modal.styles.scss";

// const Modal = ({ className, content, button }) => {
//   const [varA, setVarA] = useState("");
//   const [varB, setVarB] = useState([]);

//   useEffect(() => {
//     // same as componentDidMount() (not really but sorta; read up on this)
//   }, []);

//   return (
//     <div className="modal-container">
//       <div className="modal-backdrop"></div>

//       <div className="modal-content">
//         <LoginRegisterPanel />
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React, { useState, useEffect } from "react";
import Portal from "../portal/portal.component";

// custom components:
// import LogIn from "../login/login.component";
// import Register from "../register/register.component";
// import LoginRegisterPanel from "../login-register-panel/login-register-panel.component";

import "./modal.styles.scss";

const Modal = ({
  defaultShow = false,
  children,
  backdrop = false,
  backdropStyle,
  triggerComponent,
  triggerType = "click",
}) => {
  const [show, setShow] = useState(defaultShow);
  // const [varB, setVarB] = useState([]);

  useEffect(() => {
    // same as componentDidMount() (not really but sorta; read up on this)
  }, []);

  const toggleModal = () => {
    setShow(!show);
  };

  let NewTriggerComponent = null;
  if (React.isValidElement(triggerComponent)) {
    switch (triggerType) {
      case "hover":
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onMouseEnter: toggleModal,
          onClick: toggleModal,
        });
        break;
      default:
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onClick: toggleModal,
        });
    }
  }

  return (
    <React.Fragment>
      {NewTriggerComponent}
      <Portal>
        {show ? (
          <div className="modal-container">
            {backdrop ? (
              <div
                onClick={toggleModal}
                style={backdropStyle}
                className={`modal-backdrop`}
              ></div>
            ) : null}
            }<div className="modal-content">{children}</div>
          </div>
        ) : (
          ""
        )}
      </Portal>
    </React.Fragment>
  );
};

export default Modal;
