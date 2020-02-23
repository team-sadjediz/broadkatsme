const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");

router.get("/findroom", async function(req, res) {
  let roomID = req.query.roomID;
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
  let subscribers = [];
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

router.get("/get-thumbnail", async function(req, res) {
  let s3 = new aws.S3();
  // let url = req.params.thumbnail_url;
  let url = "default1.png";
  console.log(url);
  let data = await s3.getObject({ Bucket: "broadkats.me", Key: url }).promise();
  //  function(error, data) {
  //   res.writeHead(200, { "Content-Type": "image/png" });
  //   res.write(data.Body, "binary");
  //   res.end(null, "binary");
  // res.send({ data });
  // });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.write(data.Body, "binary");
  res.end(null, "binary");
});

module.exports = router;
