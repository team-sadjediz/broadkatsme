// const admin = require("firebase-admin");

// // Local Deployment
// const config = require("../credentials/admin-credentials");

// admin.initializeApp({
//   credential: admin.credential.cert({
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     //  || config.FIREBASE_PROJECT_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     // Heroku Deployment - Uncomment for heroku deployment!
//     // config.FIREBASE_PRIVATE_KEY,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL
//     //  || config.FIREBASE_CLIENT_EMAIL
//   }),
//   databaseURL: process.env.FIREBASE_DATABASE_URL
//   //  || config.FIREBASE_URL
// });

// module.exports = admin;