const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");

router.get("/findroom", async function(req, res) {
  let roomID = req.body.roomID;
  await Room.findById(roomID, function(error, room) {
    console.log(JSON.stringify(room));
    res.send(room);
  });
  // res.send("Room info returned");
});

router.post("/createroom", async function(req, res) {
  // json.stringify(req)
  let name = req.body.room_name;
  let owner_ID = req.body.uid;
  let subscribers = [];
  let tags = req.body.tags;
  // settings
  let room_size = req.body.room_size;
  let private = req.body.privacy;
  // access
  let del = req.body.uid;
  let roomAdmins = [req.body.uid];
  let operator = [req.body.uid];
  let invitation = [req.body.uid];
  let banned = [];
  // build models to push

  let new_room = new Room({
    name: name,
    owner_ID: owner_ID,
    subscriber: subscribers,
    tags: tags,
    settings: {
      room_size: room_size,
      private: private,
      access: {
        delete: del,
        roomAdmins: roomAdmins,
        operator: operator,
        invitation: invitation,
        banned: banned
      }
    }
  });

  await new_room
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("New room insert failed."));
});

// send json with: { folder: ..., uid: ..., image: ...}
// order is required
router.post("/upload-thumnail", function(req, res) {
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

module.exports = router;
