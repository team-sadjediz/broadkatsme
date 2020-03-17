const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const UserProfile = require("../models/userprofile.model");
const User = require("../models/user.model");

// ---------------------------------------------------------- USER PROFILE EXISTS ----------------------------------------------------------

// router.get("/valid/:username", async function(req, res) {
//   let username = req.params.username;
//   await User.exists({ "username": username })
//     .then(exists => {
//       res.send(exists);
//     })
//     .catch(error => res.status(404).send(`User ${username} is not found.`));
// });

// ---------------------------------------------------------- FIND USER PROFILE ----------------------------------------------------------

// How To Use
// axios.get(${BASE_API_URL}/userprofile/details/${uid})
router.get("/details/:uid", async function(req, res) {
  let uid = req.params.uid;
  await UserProfile.findOne({ userID: uid })
    .then(userprofile => {
      res.send(userprofile);
    })
    .catch(error => res.status(404).send(error));
});

// ---------------------------------------------------------- UPLOAD/GET USER PROF PIC ----------------------------------------------------------

// How To Use
// Create File Upload Handler w/async files argument

// const fileUploadHandler = async files => {
//  const formData = new formData();
//  formData.append("uid", { YOUR UID HERE });
//  formData.append("image", files);
//  const config = {
//   headers: {
//     "content-type": "multipart/form-data"
//     }
//   };
//  await axios.put(`${BASE_API_URL}/userprofile/upload-profile-image/${uid})1, formData, config)
//        .then(res => console.log(res.data)).catch(error => console.log(error));
// }

// const onChangeImg = e => {
//   fileUploadHandler(e.target.files[0]);
// }

// Utilize <form> <input type="file" accept="image/png, image/jpeg" onChange={onChangeImg} /> </form>

// router.post("/upload-profile-image/:uid", function(req, res, next) {
//   // to-do: do a check to see if the UID exists as either png or jpg
//   req.query.folder = "profile_img/";
//   singleUpload(req, res, async error => {
//     let imageName, imageLocation;
//     if (error) {
//       console.log(error);
//       res.json({ error: error });
//     } else {
//       if (req.file === undefined) {
//         console.log("Error: No File Selected");
//         res.json("Error: No File Selected");
//       } else {
//         imageName = req.file.key;
//         imageLocation = req.file.location;

//         await User.findOneAndUpdate(
//           { userID: req.params.uid },
//           { photoURL: imageName },
//           { runValidators: true, new: true }
//         )
//           .then(user => {
//             console.log(user);
//             res.send(user.photoURL);
//           })
//           .catch(error => res.status(404).send(error));
//       }
//     }
//   });
// });

router.put("/upload-profile-image/:uid", function(req, res) {
  // to-do: do a check to see if the UID exists as either png or jpg
  req.query.folder = "profile_img/";
  singleUpload(req, res, async error => {
    let imageName, imageLocation;
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected");
        res.json("Error: No File Selected");
      } else {
        // console.log("here is the file" + JSON.stringify(req.file));
        imageName = req.file.key;
        imageLocation = req.file.location;

        await User.findOneAndUpdate(
          { userID: req.params.uid },
          { photoURL: imageName },
          { runValidators: true, new: true }
        )
          .then(user => {
            // console.log(user);
            res.send(user.photoURL);
          })
          .catch(error => res.status(404).send(error));

          await UserProfile.findOneAndUpdate(
            { userID: req.params.uid },
            { photoURL: imageName },
            { runValidators: true, new: true }
          )
            .then(userprofile => {
              // console.log(userprofile);
              res.send(userprofile.photoURL);
            })
            .catch(error => res.status(404).send(error));
      }
      
    }
  });
});

// How To Use:
// <img src={`http://localhost:5000/api/userprofile/get-photo=${photo_url}`} />
router.get("/get-photo", async function(req, res) {
  let s3 = new aws.S3();
  let url = req.query.photoUrl;
  let folder = "profile_img/";
  console.log(url);
  let data = await s3.getObject({ Bucket: "broadkats.me", Key: url }).promise();
  console.log(data);
  res.writeHead(200, { "Content-Type": "image/png, image/jpg" });
  res.write(data.Body, "binary");
  res.end(null, "binary");
});
// ---------------------------------------------------------- USERNAME ----------------------------------------------------------

router.get("/set-username", async function(req, res, next) {
  let newUsername = req.query.requestedUsername;
  await User.findOne({ username: newUsername })
    .then(userprofile => {
      let response = userprofile;
      res.send(response);
    })
    .catch(res.status(404).send(`User ${uid} profile is not found.`));
});

router.get("/validate-username", async (req, res, next) => {
  const newUsername = req.query.requestedUsername;

  const userProfile = new UserProfile({
    "userID": "",
    "username": newUsername,
    "chatColor": "",
    "photoURL": "",
    "biography": "",
    "tags": [],
    "favorites": { movies: "", music: "", websites: "" },
    "privacy": true
  });

  userProfile
    .validate()
    .then(() => {
      res.status(200).send("good");
    })
    .catch(error => {
      const errorList = error.errors;
      const errorKeys = Object.keys(errorList);
      console.log("ALL ERRORS", errorKeys);

      let e;
      errorKeys.forEach(errorType => {
        console.log("type", errorList[errorType].properties.type);
        console.log("msg", errorList[errorType].properties.message);
        e = {
          type: errorList[errorType].properties.type,
          msg: errorList[errorType].properties.message
        };
      });

      res.status(422).send(e);
    });
});

module.exports = router;

// ---------------------------------------------------------- UPDATE PROFILE ----------------------------------------------------------

//findoneandupdate(filter, update, options)
router.put("/edit/:uid", async function(req, res){
  let uid = req.params.uid;
  let update = {};
  let updateSet = {};
  if(req.query.username) update.username = req.query.username;
  if(req.query.biography) update.biography = req.query.biography;
  if(req.query.privacy) update.privacy = req.query.privacy;
  // if(req.query.movies) update.favorites = {movies: req.query.movies};
  // if(req.query.music) update.favorites = {music: req.query.music};
  // if(req.query.websites) update.favorites = {websites: req.query.websites};
  update.favorites = {
    movies: req.query.movies,
    music: req.query.music,
    websites: req.query.websites
  };

  await UserProfile.findOneAndUpdate(
    {userID: uid},
    {$set: update},
    { new: true }
  )
  .then(document => res.send(document))
  .catch(error => res.status(400).send(error));

});