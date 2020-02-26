const express = require("express");
const path = require("path");

const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

// const admin = require("./server/firebase-config/admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded());
// app.use(express.json());

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// --------------------------------- Q U E R I E S ---------------------------------

const home = require("./server/routes/home");
const userProfile = require("./server/routes/userprofile");
const userProps = require("./server/routes/userprops");
const register = require("./server/routes/register");
const room = require("./server/routes/room");
const search = require("./server/routes/search");
const roomSettings = require("./server/routes/roomsettings");
const friends = require("./server/routes/friends");

// --------------------------------- D B - C O N N ---------------------------------

let uri;

try {
  uri = require("../credentials/uri-credentials.js");
} catch {
  console.log("MongoDB keys not found.");
  console.log("Defaulting to environment keys.");
}

const databaseURI = process.env.MONGODB_URI || uri;

mongoose.connect(databaseURI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB server connection open.`);
});

// --------------------------------- - - - - - - ---------------------------------

// const verifyAuthToken = async function(req, res, next) {
//   const idToken = req.headers.authorization;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);

//     if (decodedToken) {
//       // appends uid for usage in other routes
//       req.body.uid = decodedToken.uid;
//       // middleware verification of correct user access to particular routes
//       return next();
//     } else {
//       return res.status(401).send("Unauthorized access.");
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send("Unauthorized access.");
//   }
// };

// --------------------------------- A P P C O N F ---------------------------------

// app.use("", );
// app.use("/", verifyAuthToken);
app.use("/api/home", home);
app.use("/api/userprofile", userProfile);
app.use("/api/register", register);
app.use("/api/room", room);
app.use("/api/search", search);
app.use("/api/userprops", userProps);
app.use("/api/roomsettings", roomSettings);
app.use("/api/friends", friends);

// --------------------------------- A P P C O N F ---------------------------------

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
