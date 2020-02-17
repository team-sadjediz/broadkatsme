// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Put all API endpoints under '/api'
// app.get('/test', (req, res) => {

//   // Return them as json
//   res.json({name: "testname", age: "nothing"});

// });

// // The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// const port = process.env.PORT || 5000;
// app.listen(port);

// console.log(`Express server listening on port: ${port}`);

const express = require("express");
const path = require("path");

const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const admin = require("./server/firebase-config/admin");
// const admin = require("./server/firebase-config/admin-credentials");
// const uri = require("./server/mongo-config/uri-credentials");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use(express.urlencoded());
// app.use(express.json());

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// --------------------------------- M O D E L S ---------------------------------

// const UserProfile = require("./server/models/userprofile.model");
// const UserProps = require("./server/models/userprops.model");

// const Room = require("./server/models/room.model");
// const Chat = require("./server/models/chat.model");

// const RoomReport = require("./server/models/roomreport.model");
// const UserReport = require("./server/models/userreport.model");

// --------------------------------- Q U E R I E S ---------------------------------

const home = require("./server/routes/home");
const userProfile = require("./server/routes/userprofile");
const register = require("./server/routes/register");
const room = require("./server/routes/room");
const search = require("./server/routes/search");

// --------------------------------- D B - C O N N ---------------------------------

// Inquire @ Julie for hard-coded configuration of database access (hidden in config
// var to avoid release of private database credentials)

const databaseURI = process.env.MONGODB_URI;
// const databaseURI = uri;

mongoose.connect(databaseURI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB server connection open.`);
});

// --------------------------------- - - - - - - ---------------------------------

const verifyAuthToken = async function(req, res, next) {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken) {
      // appends uid for usage in other routes
      req.body.uid = decodedToken.uid;
      // middleware verification of correct user access to particular routes
      return next();
    } else {
      return res.status(401).send("Unauthorized access.");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unauthorized access.");
  }
};

// --------------------------------- A P P C O N F ---------------------------------

// app.use("", );
// app.use("/", verifyAuthToken);
app.use("/api/home", home);
app.use("/api/userprofile", userProfile);
app.use("/api/register", register);
app.use("/api/room", room);
app.use("/api/search", search);

// --------------------------------- A P P C O N F ---------------------------------

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
