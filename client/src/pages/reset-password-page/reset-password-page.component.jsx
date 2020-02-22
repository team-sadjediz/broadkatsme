import React from "react";

import ResetPassword from "../../components/reset-password/reset-password.component";
import "./reset-password-page.style.scss";

const ResetPasswordPage = () => (
  <div className="reset-password-page">
    <ResetPassword />
  </div>
);
let roomID = req.query.roomID;
console.log(roomID);
await Room.findById(roomID, function(error, room) {
  console.log(JSON.stringify(room));
  res.json(room);
});

export default ResetPasswordPage;
