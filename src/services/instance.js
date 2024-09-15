import axios from "axios";

// define the base url
import { baseURL } from "../config/config";

// define the axios instance
const instance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
