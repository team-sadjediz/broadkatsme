const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const UserProfile = require("../models/userprofile.model");

router.get("/user", async function(req, res) {
  let user_ID = req.body.uid;
  await UserProfile.find({ user_ID: user_ID }, function(error, userprofile) {
    console.log(JSON.stringify(userprofile));
    res.send(userprofile);
  });
  // res.send("User profile & props returned");
});

router.post("/upload-prof-img", function(req, res, next) {
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
  // const file = req.file;
  // if (!file) {
  //   const error = new Error("Upload Error: missing file");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }
  // res.send(file);
  // singleUpload(
  //   (req,
  //   res,
  //   function(error) {
  // if (error) {
  //   return res
  //     .status(422)
  //     .send({ errors: [{ title: "Upload Error", detail: error.message }] });
  // }
  // return res.json({ imageURL: req.file.location });
  //   })
  // );
});

module.exports = router;
