const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- CREATE / DELETE / FIND ROOMS ----------------------------------------------------------

router.get("/findroom", async function(req, res) {
  let roomID = req.query.roomID;
  console.log("coming from findroom");
  console.log(roomID);
  await Room.findById(roomID, function(error, room) {
    console.log(JSON.stringify(room));
    res.json(room);
  });
});

router.post("/createroom", async function(req, res) {
  let name = req.body.room_name;
  let owner_ID = req.body.uid;
  let thumbnail_url = "default1.png";
  let subscribers = [req.body.uid];
  let tags = req.body.tags;
  let room_size = req.body.room_size;
  let private = req.body.privacy;
  let del = req.body.uid;
  let room_admins = [req.body.uid];
  let operator = [req.body.uid];
  let invitation = [req.body.uid];
  let banned = [];

  let new_room = new Room({
    name: name,
    owner_ID: owner_ID,
    thumbnail_url: thumbnail_url,
    subscriber: subscribers,
    tags: tags,
    settings: {
      room_size: room_size,
      private: private,
      access: {
        delete: del,
        roomAdmins: room_admins,
        operator: operator,
        invitation: invitation,
        banned: banned
      }
    }
  });

  // await new_room
  //   .save()
  //   .then(document => console.log(document))
  //   .catch(error => res.status(400).send("New room insert failed."));

  let room_ID;
  await new_room
    .save()
    .then(document => (room_ID = document._id))
    // .then(document => console.log(document._id))
    .catch(error => res.status(400).send("New room insert failed."));

  // console.log("user id", owner_ID);
  // console.log(room_ID);
  await UserProps.findOneAndUpdate(
    { user_ID: owner_ID },
    { $addToSet: { owned_rooms: room_ID, subscribed_rooms: room_ID } },
    { new: true }
  )
    .then(document => {
      console.log(document.subscribed_rooms);
      res.send(document.subscribed_rooms);
    })
    .catch(error =>
      res.status(400).send("New room insert added to user props failed.")
    );
});

// ---------------------------------------------------------- UPLOAD / GET THUMBNAILS ----------------------------------------------------------

// send json with: { folder: ..., uid: ..., image: ...}
// order is required
router.put("/upload-thumnail", function(req, res) {
  singleUpload(req, res, error => {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected");
        res.json("Error: No File Selected");
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;

        res.json({ image: imageName, location: imageLocation });
      }
    }
  });
});

// How to Use:
// <img src={`http://localhost:5000/api/room/get-thumbnail?thumbnail_url=${thumbnail_url}`} />
router.get("/get-thumbnail", async function(req, res) {
  let s3 = new aws.S3();
  let url = req.query.thumbnail_url;
  console.log(url);
  let data = await s3.getObject({ Bucket: "broadkats.me", Key: url }).promise();
  res.writeHead(200, { "Content-Type": "image/png, image/jpg" });
  res.write(data.Body, "binary");
  res.end(null, "binary");
});

// ---------------------------------------------------------- ADD / REMOVE SUBSCRIBERS ----------------------------------------------------------

router.put("/add-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_subscriber = req.body.uid;

  let room_document, userprops_document;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $addToSet: { subscriber: new_subscriber } }
  )
    .then(document => (room_document = document))
    .catch(error => res.status(400).send("Add subscriber failed."));

  if (room_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: new_subscriber },
      { $addToSet: { subscribed_rooms: room_ID } }
    )
      .then(document => (userprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    room_document: room_document,
    userprops_document: userprops_document
  });
});

router.put("/remove-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_subscriber = req.body.uid;

  let room_document, userprops_document;
  await Room.findOneAndUpdate(
    {
      _id: room_ID,
      subscriber: { $in: del_subscriber },
      owner_ID: { $nin: del_subscriber }
    },
    { $pull: { subscriber: del_subscriber } }
  )
    .then(document => (room_document = document))
    .catch(error => res.status(400).send("Remove subscriber failed."));

  if (room_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: del_subscriber, owned_rooms: { $nin: room_ID } },
      { $pull: { subscribed_rooms: room_ID } }
    )
      .then(document => (userprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    room_document: room_document,
    userprops_document: userprops_document
  });
});

// ---------------------------------------------------------- ADD / REMOVE TAGS ----------------------------------------------------------

router.put("/add-tags", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_tag = req.body.new_tag;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $addToSet: { tags: new_tag } },
    { new: true }
  )
    .then(document => res.send(document.tags))
    .catch(error => res.status(400).send("Add tag failed."));
});

router.put("/remove-tags", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_tag = req.body.del_tag;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { tags: del_tag } },
    { new: true }
  )
    .then(document => res.send(document.tags))
    .catch(error => res.status(400).send("Remove tag failed."));
});

module.exports = router;
