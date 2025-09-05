import axios from "axios";

const apiRequest = axios.create({
    // baseURL: "https://real-estate-backend-8uov.onrender.com/api",
    // baseURL: "https://regal-brioche-8c4966.netlify.app/api",
  baseURL: "http://localhost:8800/api",
    withCredentials: true,
});

export default apiRequest;
