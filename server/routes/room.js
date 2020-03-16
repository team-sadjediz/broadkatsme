const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const mongoose = require("mongoose");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- FIND ROOMS ----------------------------------------------------------

// How To Use:
// axios.get(`${BASE_API_URI}/room/${roomID})
// returns TRUE or FALSE if room exists
router.get("/valid/:roomID", async function(req, res) {
  let roomID = req.params.roomID;
  await Room.exists({ _id: roomID })
    .then(exists => {
      res.send(exists);
    })
    .catch(error => res.status(404).send(error));
});

// ---------------------------------------------------------- FIND ROOMS ----------------------------------------------------------

// How To Use:
// axios.get(`${BASE_API_URI}/room/${roomID})
// returns entire document if found
router.get("/find/:roomID", async function(req, res) {
  let roomID = req.params.roomID;
  await Room.findById(roomID)
    .then(room => {
      res.json(room);
    })
    .catch(error => {
      res.status(404).send(error);
    });
});

// ---------------------------------------------------------- UPDATE STATUS ----------------------------------------------------------

// How To Use:
// axios.put(`${BASE_API_URI}/room/${roomID})
// returns active status of document
router.put("/active/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let active = req.query.active;

  await Room.findOneAndUpdate(
    // { _id: roomID, "settings.access.roomAdmins": uid },
    { _id: roomID },
    { active: active },
    { runValidators: true, new: true }
  )
    .then(document => {
      res.send(document.active);
    })
    .catch(error => res.status(404).send(error));
});

// ---------------------------------------------------------- CREATE FIND ROOMS ----------------------------------------------------------

// How To Use:
// axios.post(`${BASE_API_URI}/room/create`, { body })
// { body } == { roomName, uid, roomSize, privacy}
// returns new subscribed rooms
router.post("/create", async function(req, res) {
  try {
    let newRoom = await createRoom(
      req.body.roomName,
      req.body.uid,
      req.body.roomSize,
      req.body.privacy
    );
    res.send(newRoom);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

async function createRoom(roomName, uid, roomSize, privacy) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let newRoom = new Room({
      name: roomName,
      ownerID: uid,
      thumbnailUrl: "default1.png",
      active: false,
      subscribers: [uid],
      tags: [],
      settings: {
        roomSize: roomSize,
        privacy: privacy,
        access: {
          delete: uid,
          roomAdmins: [uid],
          operators: [uid],
          invitations: [uid],
          bans: []
        }
      }
    });

    let newRoomDocument = await newRoom.save(opts);
    let newRoomID = newRoomDocument._id;
    let updatedUserProps = await UserProps.findOneAndUpdate(
      { userID: uid },
      { $addToSet: { ownedRooms: newRoomID, subscribedRooms: newRoomID } },
      opts
    );

    await session.commitTransaction();
    session.endSession();

    return updatedUserProps.subscribedRooms;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = "Error has occured in /room/create";
    throw error;
  }
}

// ---------------------------------------------------------- DELETE ROOMS ----------------------------------------------------------

// How To Use:
// axios.delete(`${BASE_API_URI}/room/delete/${roomID}/${uid}`)
// returns empty body (as per convention)
router.delete("/delete/:roomID/:uid", async function(req, res) {
  try {
    let updatedUserProps = await deleteRoom(req.params.roomID, req.params.uid);
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error);
  }
});

async function deleteRoom(roomID, uid) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, runValidators: true };

    let deletedRoom = await Room.findOneAndDelete(
      {
        _id: roomID,
        ownerID: uid
      },
      opts
    );

    let updatedUserProps = await UserProps.updateMany(
      { subscribedRooms: { $in: roomID } },
      {
        $pull: {
          subscribedRooms: roomID,
          ownedRooms: roomID,
          favoritedRooms: roomID
        }
      },
      opts
    );

    await session.commitTransaction();
    session.endSession();
    return { updatedUserProps };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    error.addiotional = `Error has occurred in /room/delete`;
    throw error;
  }
}

// ---------------------------------------------------------- UPLOAD / GET THUMBNAILS ----------------------------------------------------------

// in progress
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

// How To Use:
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

// How To Use:
// axios.put(`${BASE_API_URI}/room/tags/${roomID}/${uid}`)
// returns updated resources (as per convention)
router.put("/tags/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let tags = req.query.tags;
  let action = req.query.action;
  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID, "settings.access.roomAdmins": uid },
      { $pull: { tags: tags } },
      { runValidators: true, new: true }
    )
      .then(document => {
        res.send(document.tags);
      })
      .catch(error => res.status(400).send(error));
  } else if (action == "add") {
    await Room.findOneAndUpdate(
      { _id: roomID, "settings.access.roomAdmins": uid },
      { $addToSet: { tags: tags } },
      { runValidators: true, new: true }
    )
      .then(document => res.send(document.tags))
      .catch(error => res.status(400).send(error));
  } else {
    res.status(400).send("Bad request.");
  }
});

module.exports = router;
