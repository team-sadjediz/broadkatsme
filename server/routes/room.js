const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const Room = require("../models/room.model");
const Chat = require("../models/chat.model");

router.get("/find-room", async function(req, res) {
  let roomID = req.query.roomID;
  console.log(roomID);
  await Room.findById(roomID, function(error, room) {
    console.log(JSON.stringify(room));
    res.json(room);
  });
});

router.post("/createroom", async function(req, res) {
  // let params = json.stringify(req.body);

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
  // access
  let del = req.body.uid;
  let room_admins = [req.body.uid];
  let operator = [req.body.uid];
  let invitation = [req.body.uid];
  let banned = [];
  // build models to push

  // let name = params.room_name;
  // let owner_ID,
  //   del = params.uid;
  // let subscribers,
  //   room_admins,
  //   operator,
  //   invitation = [params.uid];
  // let tags = params.tags;
  // let room_size = params.room_size;
  // let private = params.privacy;
  // let banned = [];

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
  await Room.findOneAndUpdate({ _id: room_ID }, { $set: { name: new_name } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Room name change failed."));
  res.send("Room name updated.");
});

router.put("/add-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_subscriber = req.body.new_subscriber;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { subscriber: new_subscriber } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Add subscriber failed."));
});

router.put("/remove-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_subscriber = req.body.del_subscriber;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { uid: del_subscriber } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove subscriber failed."));
});

router.put("/add-tags", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_tag = req.body.new_tag;
  await Room.findOneAndUpdate({ _id: room_ID }, { $push: { tags: new_tag } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Add tag failed."));
});

router.put("/remove-tags", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_tag = req.body.del_tag;
  await Room.findOneAndUpdate({ _id: room_ID }, { $pull: { tags: del_tag } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/change-roomsize", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_size = req.body.new_size;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $set: { "settings.room_size": new_size } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/change-privacy", async function(req, res) {
  let room_ID = req.body.room_ID;
  let privacy = req.body.privacy;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $set: { "settings.privacy": privacy } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/delete-room", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Room.findByIdAndRemove(room_ID, function(error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Room deleted.");
    }
  });
});

router.put("/add-admins", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_admin = req.body.new_admin;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.roomAdmins": new_admin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin addition failed."));
});

router.put("/remove-admins", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_admin = req.body.del_admin;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.roomAdmins": del_admin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin removal failed."));
});

router.put("/add-operators", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_operator = req.body.new_operator;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.operator": new_operator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator addition failed."));
});

router.put("/remove-operators", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_operator = req.body.del_operator;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.operator": del_operator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator removal failed."));
});

router.put("/add-inviter", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_inviter = req.body.new_inviter;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.invitation": new_inviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter addition failed."));
});

router.put("/remove-invite", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_inviter = req.body.del_inviter;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.invitation": del_inviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter removal failed."));
});

router.put("/add-banner", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_banner = req.body.new_banner;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.banned": new_banner } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner addition failed."));
});

router.put("/remove-banned", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_banner = req.body.del_banner;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.banned": del_banner } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner removal failed."));
});

router.get("/get-chats", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Chat.findOne({ room_ID: room_ID }, function(error, chat) {
    if (error) {
      res.send(error);
    } else {
      res.send(chat);
    }
  });
});

router.put("/clear-chat", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Chat.findOneAndUpdate({ room_ID: room_ID }, { $set: { log: [] } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Clear chat failed."));
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
