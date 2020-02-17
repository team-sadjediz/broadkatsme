const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");

router.get("/find-room", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Room.findById(roomID, function(error, room) {
    console.log(JSON.stringify(room));
    res.send(room);
  });
  // res.send("Room info returned");
});

router.post("/create-room", async function(req, res) {
  let name = req.body.room_name;
  let owner_ID,
    del = req.body.uid;
  let subscribers,
    room_admins,
    operator,
    invitation = [req.body.uid];
  let tags = req.body.tags;
  let room_size = req.body.room_size;
  let private = req.body.privacy;
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
        roomAdmins: room_admins,
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

  res.send("New room created.");
});

router.put("/change-name", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_name = req.body.new_name;
  await Room.updateOne(
    { _id: room_ID },
    { $set: { name: new_name } }
  ).catch(error => res.status(400).send("Room name change failed."));
  res.send("Room name updated.");
});

router.put("/add-subscriber", async function(req, res) {});

router.put("/remove-subscriber", async function(req, res) {});

router.put("/add-tags", async function(req, res) {});

router.put("/remove-tags", async function(req, res) {});

router.put("/change-roomsize", async function(req, res) {});

router.put("/change-privacy", async function(req, res) {});

router.put("/delete-room", async function(req, res) {});

router.put("/add-admins", async function(req, res) {});

router.put("/remove-admins", async function(req, res) {});

router.put("/add-operators", async function(req, res) {});

router.put("/remove-operators", async function(req, res) {});

router.put("/add-invite", async function(req, res) {});

router.put("/remove-invite", async function(req, res) {});

router.put("/add-banned", async function(req, res) {});

router.put("/remove-banned", async function(req, res) {});

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
