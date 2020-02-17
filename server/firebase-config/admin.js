const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

//   await admin
//     .auth()
//     .verifyIdToken(idToken)
//     .then(function(decodedToken) {
//       req.body.uid = decodedToken.uid;
//     })
//     .catch(function(error) {
//       console.log(error);
//       return res.status(401).send("Unauthorized access.");
//     });

module.exports = admin;
