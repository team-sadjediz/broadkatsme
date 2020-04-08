let config;

try {
  require("./admin-credentials");
} catch {
  console.log("Firebase SDK keys not found locally.");
  console.log("Using heroku environment variable as keys.");
}

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: config.FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    //  || ,
    private_key:
      config.FIREBASE_PRIVATE_KEY ||
      process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    // Heroku Deployment - Uncomment for heroku deployment!
    // config.FIREBASE_PRIVATE_KEY,
    clientEmail:
      config.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: config.FIREBASE_URL || process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;
