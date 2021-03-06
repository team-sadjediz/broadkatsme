// require("dotenv").config(); // injects environment variables from .env file
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
  updateUser,
  getUsersInRoom,
  getAllUsers,
} = require("./chat.utils");

const {
  addMessageToRoom,
  getMessagesFromRoom,
  getAllMessages,
} = require("./room.utils");

// console.log("root index.js envs:", process.env);
// const admin = require("./server/firebase-config/admin");

// console.log("root index.js envs:", process.env);
const admin = require("./server/services/admin");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// mongoose.plugin(require("./server/utils/mongoose-error-plugin"));
// --------------------------------- V E R I F Y () ---------------------------------

const verifyAuthToken = async function (req, res, next) {
  // console.log(req);
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
    // console.log(decodedToken);
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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const server = http.createServer(app);
const io = socketio(server);

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("join", ({ id, name, chatColor, room, date }, callback) => {
    console.log("------------------------------------------");
    console.log("JOINING ROOM", getUser(socket.id));
    console.log(
      `SERVER: socket: ${socket.id} / user (${name}) -> room [${room}]`
    );
    console.log("------------------------------------------");

    const { error, user } = addUser({
      socketID: socket.id,
      id,
      name,
      chatColor,
      room,
    });

    if (error) return callback(error);

    const msg = [
      ...getMessagesFromRoom(user.room),
      addMessageToRoom(user.room, {
        user: "admin",
        text: `${user.name} has joined!`,
        date: date,
      }),
    ];

    socket.emit("message", msg);
    socket.broadcast.to(user.room).emit("message", msg);

    socket.join(user.room);

    // console.log("joining room:");
    // console.log(getAllUsers());
    // console.log("------------------------------------------");

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    const msg = [
      ...getMessagesFromRoom(user.room),
      addMessageToRoom(user.room, {
        userID: user.id,
        user: user.name,
        chatColor: user.chatColor,
        text: message.msg,
        date: message.date,
      }),
    ];

    io.to(user.room).emit("message", msg);

    socket.emit("message", msg);

    callback();
  });

  socket.on("update", (chatColor, callback) => {
    // console.log("updating chat color for user", chatColor);
    const user = getUser(socket.id);

    // console.log("user:", user);
    updateUser({
      socketID: socket.id,
      id: user.id,
      name: user.name,
      chatColor, // only thing updated
      room: user.room,
    });
    // console.log("user after update:", getUser(socket.id));
    callback();
  });

  socket.on("updateBlockControl", (blockControl, callback) => {
    // console.log("updating chat color for user", chatColor);
    const user = getUser(socket.id);
    console.log("attempting udpateBlockControl");

    io.to(user.room).emit("pushBlockControl", "pushBlockControlSent");

    socket.emit("pushBlockControl", "pushBlockControlSent");

    callback();
  });

  socket.on("leaveRoom", () => {
    console.log("------------------------------------------");
    console.log("LEAVING ROOM", getUser(socket.id), socket.id);
    console.log("------------------------------------------");

    const user = removeUser(socket.id);

    if (user) {
      socket.leave(user.room);
      io.to(user.room).emit("message", [
        ...getMessagesFromRoom(user.room),
        addMessageToRoom(user.room, {
          user: "admin",
          text: `${user.name} has left.`,
          date: new Date(),
        }),
      ]);

      // io.to(user.room).emit("roomData", {
      //   room: user.room,
      //   users: getUsersInRoom(user.room)
      // });
    }
    // console.log("leaving room:");
    // console.log(getAllUsers());
    // console.log("------------------------------------------");
  });

  socket.on("disconnect", () => {
    console.log("------------------------------------------");
    console.log(
      `SERVER: disconnected socket: ${socket.id} / user has LEFT room`
    );

    console.log("------------------------------------------");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", [
        ...getMessagesFromRoom(user.room),
        addMessageToRoom(user.room, {
          user: "admin",
          text: `${user.name} has left.`,
          date: new Date(),
        }),
      ]);
      // io.to(user.room).emit("roomData", {
      //   room: user.room,
      //   users: getUsersInRoom(user.room)
      // });
    }
    // console.log(getAllUsers());
  });

  socket.on("requestVirtualBrowser", () => {
    console.log("------------------------------------------");
    console.log("requestVirtualBroswer");

    const user = getUser(socket.id);

    if (user) {
      io.emit("givemevb", {
        socketId: socket.id,
        uid: user.id,
        roomRequested: user.room,
      });
    }
    // console.log(getAllUsers());
    console.log("------------------------------------------");
  });

  socket.on("portAllocated", (portAllocationInfo) => {
    console.log("------------------------------------------");
    console.log("portAllocated");

    console.log(portAllocationInfo);

    io.to(portAllocationInfo.roomRequested).emit("receiveVbPort", {
      vbPort: portAllocationInfo.port,
    });

    console.log("------------------------------------------");
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

mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB server connection open.`);
});
