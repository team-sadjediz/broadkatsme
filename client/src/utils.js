const URL_DEVELOPMENT = "http://localhost:5000";
const URL_PRODUCTION = "http://broadkatsme.herokuapp.com";

// will be changed later:
const URL_CHAT_DEVELOPMENT = "http://localhost:5000";
const URL_CHAT_PRODUCTION = "http://broadkatsme.herokuapp.com";

let BASE_API_URL;
let CHAT_SERVER;

switch (process.env.NODE_ENV) {
  case "development":
    BASE_API_URL = URL_DEVELOPMENT + "/api";
    CHAT_SERVER = URL_CHAT_DEVELOPMENT;
    break;
  case "production":
    BASE_API_URL = URL_PRODUCTION + "/api";
    CHAT_SERVER = URL_CHAT_PRODUCTION;

    break;
  case "test":
    BASE_API_URL = URL_DEVELOPMENT + "/api";
    CHAT_SERVER = URL_CHAT_DEVELOPMENT;

    break;
  default:
    BASE_API_URL = "we did an oopsie";
}

module.exports = { BASE_API_URL, CHAT_SERVER };
