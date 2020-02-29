import axios from "axios";
// import { BASE_API_URL } from "../utils";

const axiosConfig = axios.create({
  //   baseURL: BASE_API_URL
});

const setAuthorization = async token => {
  await axiosConfig.interceptors.request.use(config => {
    config.headers.Authorization = token;
    // console.log(config);
    return config;
  });
};

// export default AuthToken;
export { axiosConfig, setAuthorization };
