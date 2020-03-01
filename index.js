require("dotenv").config(); // injects environment variables from .env file
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getAllUsers
} = require("./chat.utils");

// console.log("root index.js envs:", process.env);
// const admin = require("./server/firebase-config/admin");

console.log("root index.js envs:", process.env);
const admin = require("./server/services/admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// --------------------------------- V E R I F Y () ---------------------------------

const verifyAuthToken = async function(req, res, next) {
  console.log(req);
  const idToken = req.headers.authorization;
  // console.log("???? " + req.headers.authorization);
  // console.log("??? " + req.query);
  // if (idToken) {
  //   await admin
  //     .auth()
  //     .verifyIdToken(idToken)
  //     .then(decodedToken => {
  //       req.body.uid = decodedToken.uid;
  //     })
  //     .catch(error => res.status(401).send("Unauthorized access."));
  // } else {
  //   res.status(401).send("Unauthorized access.");
  // }
  // try {
  //   const decodedToken = await admin.auth().verifyIdToken(idToken);
  //   console.log(decodedToken);
  //   if (decodedToken) {
  //     // appends uid for usage in other routes
  //     console.log("??");
  //     req.body.uid = decodedToken.uid;
  //     // middleware verification of correct user access to particular routes
  //     return next();
  //   } else {
  //     console.log("this one");
  //     return res.status(401).send("Unauthorized access.");
  //   }
  // } catch (error) {
  //   console.log("or this one...");
  //   return res.status(401).send("Unauthorized access.");
  // }
  if (idToken) {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log(decodedToken);
    if (decodedToken) {
      // appends uid for usage in other routes
      console.log("??");
      req.body.uid = decodedToken.uid;
      // console.log(req);
      // middleware verification of correct user access to particular routes
      return next();
    } else {
      console.log("this one");
      return res.status(401).send("Unauthorized access.");
    }
  } else {
    return res.status(401).send("Unauthorized access.");
  }
};

// --------------------------------- Q U E R I E S ---------------------------------
const home = require("./server/routes/home");
const userProfile = require("./server/routes/userprofile");
const userProps = require("./server/routes/userprops");
const register = require("./server/routes/register");
const room = require("./server/routes/room");
const search = require("./server/routes/search");
const roomSettings = require("./server/routes/roomsettings");
const friends = require("./server/routes/friends");

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
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const server = http.createServer(app);
const io = socketio(server);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

io.on("connection", socket => {
  console.log(`New connection: ${socket.id}`);

  socket.on("join", ({ name, room }, callback) => {
    console.log(
      `SERVER: socket: ${socket.id} / user (${name}) -> room [${room}]`
    );

    const { error, user } = addUser({ id: socket.id, name, room });

    // console.log(user.id);
    // console.log(socket.id);
    console.log("SERVER: error", error);
    console.log("SERVER: user:", user);
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(user.room);
    console.log(getAllUsers());

    //

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log(
      `SERVER: disconnected socket: ${socket.id} / user has LEFT room`
    );

    console.log("------------------------------------------");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
    console.log(getAllUsers());
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// --------------------------------- D B - C O N N ---------------------------------

let uri;

try {
  uri = require("./server/credentials/uri-credentials");
} catch {
  console.log("MongoDB keys not found.");
  console.log("Defaulting to environment keys.");
}

const databaseURI = uri || process.env.MONGODB_URI;

mongoose.connect(databaseURI, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB server connection open.`);
});
