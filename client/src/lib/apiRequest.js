import axios from "axios";

export const BASE_URL = "https://ezyhomes-backend.onrender.com/api";

const apiRequest = axios.create({
    
  //baseURL: "http://localhost:8800/api",
  baseURL: BASE_URL,
    withCredentials: true,
});

export default apiRequest;
