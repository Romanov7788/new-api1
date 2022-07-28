import axios from "axios";

export const url = "http://localhost:5000";

export const API_URL = "http://localhost:3000/api";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export default api;
