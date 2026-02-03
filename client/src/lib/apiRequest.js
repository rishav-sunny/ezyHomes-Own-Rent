import axios from "axios";

// Use environment variable if available, fallback to localhost for development
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8800/api";

const apiRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default apiRequest;
