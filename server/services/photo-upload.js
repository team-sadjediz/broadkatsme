const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// const AWS_SECRET_ACCES_KEY = require("../aws-config/aws-credentials")
//   .AWS_SECRET_ACCES_KEY;
// const AWS_ACCESS_KEY_ID = require("../aws-config/aws-credentials")
//   .AWS_ACCESS_KEY_ID;
// const AWS_BUCKET = require("../aws-config/aws-credentials").AWS_BUCKET;
// const AWS_REGION = require("../aws-config/aws-credentials").AWS_REGION;

// const {
//   AWS_SECRET_ACCES_KEY,
//   AWS_ACCESS_KEY_ID,
//   AWS_BUCKET,
//   AWS_REGION
// } = require("../aws-config/aws-credentials");

// const config = require("../aws-config/aws-credentials");

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  Bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION
});

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
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      //   var newFilename = Date.now().toString() + "-" + file.originalname;
      var newFilename = req.body.uid;
      var fullPath =
        req.body.folder + newFilename + path.extname(file.originalname);
      cb(null, fullPath);
    },
    limits: { fileSize: 2000000 }
  })
});

module.exports = upload;
