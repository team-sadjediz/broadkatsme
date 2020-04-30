var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");
const UserProfile = require("../models/userprofile.model");
const User = require("../models/user.model");

// ---------------------------------------------------------- SEARCH BY TAGS & NAME ----------------------------------------------------------

// How To Use
// axios.get(`${BASE_API_URL}/search/queries`, null, { params: { tags: tags, name: name }})
// returns all documents containing at least 1 of the sent tags, an optional name (if desired), privacy set to false, and room size
// not filled to capacity (5) (as per convention)
// can be adjusted to add more variables if desired
// router.get("/queries", async function(req, res) {
//   let tags = req.query.tags;
//   let name = req.query.name;

//   console.log("req.query", req.query);
//   console.log("tags", tags);
//   console.log("name", name);

//   let queries = {};

//   if (name) {
//     queries.name = name;
//   }

//   if (!tags) {
//     tags = [];
//   }
//   console.log(queries.name);
//   let numberMatchingTags = 1;

//   await Room.aggregate([
//     {
//       $match: {
//         "tags.0": { $exists: true },
//         "settings.privacy": false,
//         "subscribers.4": { $exists: false },
//         ...queries
//       }
//     },
//     {
//       $redact: {
//         $cond: [
//           {
//             $gte: [
//               { $size: { $setIntersection: ["$tags", [tags]] } },
//               numberMatchingTags
//             ]
//           },
//           "$$KEEP",
//           "$$PRUNE"
//         ]
//       }
//     }
//   ])
//     .then(rooms => {
//       res.send(rooms);
      
//     })
//     .catch(error => {
//       res.status(400).send(error);
//       console.log(error);
//     });
// });

router.get("/queries", async function(req, res) {
  let search = req.query.search;
  let filter = req.query.filter; // added
  let queries = {};
  let numberMatchingTags = 1;

  let rooms, tags, users;

  if (filter == "room" || filter == "none") {    
    await Room.aggregate([
      {
        $match: {
          "settings.privacy": false,
          "subscribers.4": { $exists: false },
          "name": { $regex: search, $options: "i"}
          // "tags": {$regex: search, $options: "i"}
          // $or: [
          //     {"name": { $regex: search, $options: "i"},
          //     "tags": {$regex: search, $options: "i"}}
          //     //{$regex: search, $options: "i"}
          // // "name": search,
            // ]
        }
      },
      {
        $lookup:
        {
          from: "userprofiles",
          localField: "ownerID",
          foreignField: "userID",
          as: "user_profile"
        }
      }
    ])
      .then(response => {
        console.log("rooms: ", response);
        rooms = response;
      })
      .catch(error => {
        console.log("room error: ", error);
        res.status(400).send(error);
      });
  }

  if (filter == "user" || filter == "none") {
    await UserProfile.find({ "username": { $regex: search, $options: "i" } })
    .then(results => {
      console.log("user: ", results);
      users = results;
    }).catch(error => {
      console.log("user error:", error);
      res.status(404).send(error);
    });
  }

  if (filter == "tags" || filter == "none") {
    await Room.aggregate([
      {
        $match: {
          "settings.privacy": false,
          "subscribers.4": { $exists: false },
          "tags": {$regex: search, $options: "i"}
          // $or: [
          //     {"name": { $regex: search, $options: "i"},
          //     "tags": {$regex: search, $options: "i"}}
            // ]
            //doesnt work because $or is short circuit
        }
      },
      {
        $lookup:
        {
          from: "userprofiles",
          localField: "ownerID",
          foreignField: "userID",
          as: "user_profile"
        }
      }
    ])
      .then(response => {
        console.log("rooms: ", response);
        tags = response;
      })
      .catch(error => {
        console.log("room error: ", error);
        res.status(400).send(error);
      });
  }

  res.send({"rooms": rooms, "users": users, "tags": tags});
});

module.exports = router;

// ---------------------------------------------------------- SEARCH BY ALL ----------------------------------------------------------
router.get('/rooms', async function(req, res) {
  Room.find({}, function(err, rooms) {
    var roomUrls = [];

    rooms.forEach(function(room) {
      roomUrls.push({
        "roomID": room._id,
        "name": room.name,
        "thumbnailUrl": room.thumbnailUrl,
        "tags": room.tags,
        "ownerID": room.ownerID,
      });
    });

    res.send(roomUrls);  
  });
});

// ---------------------------------------------------------- SEARCH USERNAMES ----------------------------------------------------------
// router.get("/user/:username", async function(req, res) {
//   let username = req.params.username;
//   await UserProfile.find({ username: username })
//   .then(user => {
//     res.json(user);
//   }).catch(error => {
//     res.status(404).send(error);
//   });
// });
