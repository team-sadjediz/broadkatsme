const admin = require("firebase-admin");

// Local Deployment
// const config = require("../credentials/admin-credentials");

let config,
  config_FIREBASE_PROJECT_ID,
  config_FIREBASE_PRIVATE_KEY,
  config_FIREBASE_CLIENT_EMAIL,
  config_FIREBASE_URL,
  process_env_FIREBASE_PRIVATE_KEY;

try {
  process_env_FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
  if (process_env_FIREBASE_PRIVATE_KEY) {
    process_env_FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    );
  }
} catch {
  console.log("Process environment PK not could not be found.");
  console.log("Checking for config PK key...");
}

try {
  config = require("../credentials/admin-credentials");
  config_FIREBASE_PROJECT_ID = config.FIREBASE_PROJECT_ID;
  config_FIREBASE_PRIVATE_KEY = config.FIREBASE_PRIVATE_KEY;
  config_FIREBASE_CLIENT_EMAIL = config.FIREBASE_CLIENT_EMAIL;
  config_FIREBASE_URL = config.FIREBASE_URL;
} catch {
  console.log("Firebase SDK Keys could not be found.");
  console.log("Defaulting to environment keys.");
}

admin.initializeApp({
  credential: admin.credential.cert({
    project_id: config_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    private_key:
      config_FIREBASE_PRIVATE_KEY || process_env_FIREBASE_PRIVATE_KEY,
    clientEmail:
      config_FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: config_FIREBASE_URL || process.env.FIREBASE_DATABASE_URL
});

module.exports = admin;
