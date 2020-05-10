// require("dotenv").config(); // injects environment variables from .env file
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const io = require("socket.io-client");
const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req, res) => res.send("Hello World!"));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const server = http.createServer(app);
let socket = io("http://localhost:5000");

console.log(socket.id);

const allocateVirtualBrowser = (requestInfo) => {
  let port = 5000;

  return port;
};

socket.on("givemevb", (requestInfo) => {
  console.log(requestInfo);
  const port = allocateVirtualBrowser(requestInfo);

  socket.emit("portAllocated", { ...requestInfo, port });
});

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });

server.listen(port, () => {
  console.log(`Allocation Server listening on port ${port}`);
});
