const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- FIND ROOMS ----------------------------------------------------------

router.get("/find-room", async function(req, res) {
  let roomID = req.query.roomID;
  await Room.findById(roomID, function(error, room) {
    if (error) {
      res.status(404).send(`Room ${roomID} is not found.`);
    } else {
      res.json(room);
    }
  });
});

// ---------------------------------------------------------- UPDATE STATUS ----------------------------------------------------------

router.put("/update-active", async function(req, res) {
  let roomID = req.query.roomID;
  let active = req.query.active;
  await Room.findOneAndUpdate({ _id: roomID }, { active: active })
    .then(document => res.send(document.active))
    .catch(error =>
      res.send(404).send(`Room ${roomID} status could not be updated.`)
    );
});

// ---------------------------------------------------------- CREATE FIND ROOMS ----------------------------------------------------------

router.post("/create-room", async function(req, res) {
  let name = req.body.roomName;
  let ownerID = req.body.uid;
  let thumbnailUrl = "default1.png";
  let active = false;
  let subscribers = [req.body.uid];
  let tags = req.body.tags;
  let roomSize = req.body.roomSize;
  let privacy = req.body.privacy;
  let deleteUser = req.body.uid;
  let roomAdmins = [req.body.uid];
  let operators = [req.body.uid];
  let invitations = [req.body.uid];
  let bans = [];

  let new_room = new Room({
    name: name,
    ownerID: ownerID,
    thumbnailUrl: thumbnailUrl,
    active: active,
    subscribers: subscribers,
    tags: tags,
    settings: {
      roomSize: roomSize,
      privacy: privacy,
      access: {
        delete: deleteUser,
        roomAdmins: roomAdmins,
        operators: operators,
        invitations: invitations,
        bans: bans
      }
    }
  });

  await new_room
    .save()
    .then(async new_room => {
      let roomID = new_room._id;
      await UserProps.findOneAndUpdate(
        { userID: ownerID },
        { $addToSet: { ownedRooms: roomID, subscribedRooms: roomID } },
        { new: true }
      )
        .then(document => {
          console.log(document.subscribedRooms);
          res.send(document.subscribedRooms);
        })
        .catch(error => {
          console.log(error);
          res.status(400).send("New room insert added to user props failed.");
        });
    })
    .catch(error => res.status(400).send("New room insert failed."));
});

// ---------------------------------------------------------- DELETE ROOMS ----------------------------------------------------------

router.delete("/delete-room", async function(req, res) {
  let roomID = req.query.roomID;
  // may not be allowed... (conventionally speaking)
  let uid = req.query.uid;
  await Room.findOneAndDelete({ _id: roomID, ownerID: uid })
    .then(async document => {
      console.log(document);
      // let subscribers = document.subscriber;
      await UserProps.findOneAndUpdate(
        {
          subscribedRooms: roomID,
          ownedRooms: roomID
        },
        {
          $pull: {
            subscribedRooms: roomID,
            ownedRooms: roomID,
            favoritedRooms: roomID
          }
        }
      )
        .then(response => {
          console.log("# of matching user props: " + response.n);
          console.log("# of documents modified: " + response.nModified);
          res.status(204).send();
        })
        .catch(res.status(404).send(`Room ${roomID} could not be found.`));
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
  let url = req.query.thumbnailUrl;
  console.log(url);
  let data = await s3.getObject({ Bucket: "broadkats.me", Key: url }).promise();
  res.writeHead(200, { "Content-Type": "image/png, image/jpg" });
  res.write(data.Body, "binary");
  res.end(null, "binary");
});

// ---------------------------------------------------------- ADD / REMOVE TAGS ----------------------------------------------------------

router.put("/add-tags", async function(req, res) {
  let roomID = req.body.roomID;
  let newTag = req.body.newTag;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $addToSet: { tags: newTag } },
    { new: true }
  )
    .then(document => res.send(document.tags))
    .catch(error => res.status(400).send("Add tag failed."));
});

router.put("/remove-tags", async function(req, res) {
  let roomID = req.body.roomID;
  let delTag = req.body.delTag;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $pull: { tags: delTag } },
    { new: true }
  )
    .then(document => res.send(document.tags))
    .catch(error => res.status(400).send("Remove tag failed."));
});

module.exports = router;
