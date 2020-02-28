const DEVELOPMENT_API_CALL_URL = "http://localhost:5000/api";
const PRODUCTION_API_CALL_URL = "http://broadkatsme.herokuapp.com/api";
let baseUrl;

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = DEVELOPMENT_API_CALL_URL;
    break;
  case "production":
    baseUrl = PRODUCTION_API_CALL_URL;
    break;
  case "test":
    baseUrl = DEVELOPMENT_API_CALL_URL;
    break;
  default:
    baseUrl = "we did an oopsie";
}

export let BASE_API_URL = baseUrl;
