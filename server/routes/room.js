const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- FIND ROOMS ----------------------------------------------------------

router.get("/findroom", async function(req, res) {
  let roomID = req.query.roomID;
  await Room.findById(roomID, function(error, room) {
    if (error) {
      res.status(404).send(`Room ${roomID} is not found.`);
    } else {
      res.json(room);
    }
  });
});

// ---------------------------------------------------------- CREATE FIND ROOMS ----------------------------------------------------------

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

  await new_room
    .save()
    .then(async new_room => {
      let room_ID = new_room._id;
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
    })
    .catch(error => res.status(400).send("New room insert failed."));
});

// ---------------------------------------------------------- DELETE ROOMS ----------------------------------------------------------

router.delete("/delete-room", async function(req, res) {
  let roomID = req.query.roomID;
  // may not be allowed... (conventionally speaking)
  let uid = req.query.uid;
  await Room.findOneAndDelete({ _id: roomID, owner_ID: uid })
    .then(async document => {
      console.log(document);
      // let subscribers = document.subscriber;
      await UserProps(
        {
          subscribed_rooms: roomID,
          owned_rooms: roomID,
          favorited_rooms: roomID
        },
        {
          $pull: {
            subscribed_rooms: roomID,
            owned_rooms: roomID,
            favorited_rooms: roomID
          }
        }
      ).then(response => {
        console.log("# of matching user props: " + response.n);
        console.log("# of documents modified: " + response.nModified);
        res.status(204).send();
      });
    })
    .catch(res.status(404).send(`Room ${roomID} could not be found.`));
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
