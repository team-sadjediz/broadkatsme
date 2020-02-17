const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const config = require("../aws-config/aws-credentials");

// ignore this
aws.config.update({});

const s3 = new aws.S3({
  /* ... */
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Mimetype is not of JPEG or PNG.", false));
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: "broadkats.me",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: "bssssss" });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString() + file.mimetype);
    },
    limits: { fileSize: 2000000 }
  })
});

module.exports = upload;
