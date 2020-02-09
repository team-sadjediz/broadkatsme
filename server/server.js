const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

// --------------------------------- M O D E L S ---------------------------------

const UserProfile = require("./models/userprofile.model");
const UserProps = require("./models/userprops.model");

const Room = require("./models/room.model");
const Chat = require("./models/chat.model");

const RoomReport = require("./models/roomreport.model");
const UserReport = require("./models/userreport.model");

// --------------------------------- Q U E R I E S ---------------------------------

// --------------------------------- D B - C O N N ---------------------------------

// Inquire @ Julie for hard-coded configuration of database access (hidden in config
// var to avoid release of private database credentials)

const databaseURI = process.env.MONGODB_URI;

mongoose.connect(databaseURI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB server connection open.`);
});

// --------------------------------- A P P C O N F ---------------------------------

// app.use("", );

// --------------------------------- A P P C O N F ---------------------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
