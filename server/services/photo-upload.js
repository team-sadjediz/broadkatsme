const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Local Deploymenet ---------------------------------------------------------------------------------------
let config;

try {
  config = require("../credentials/aws-credentials");
} catch {
  console.log("AWS keys not found locally.");
  console.log("Using heroku environment variable as keys.");
}

aws.config.update({
  secretAccessKey:
    config.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
  Bucket: config.AWS_BUCKET || process.env.AWS_BUCKET,
  region: config.AWS_REGION || process.env.AWS_REGION
});

// Heroku Deployment ---------------------------------------------------------------------------------------
// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   Bucket: process.env.AWS_BUCKET,
//   region: process.env.AWS_REGION
// });

// ---------------- ---------------------------------------------------------------------------------------

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
      var newFilename = req.body.uid;
      var fullPath =
        req.body.folder + newFilename + path.extname(file.originalname);
      cb(null, fullPath);
    },
    limits: { fileSize: 2000000 }
  })
});

module.exports = upload;
