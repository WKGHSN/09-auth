import axios from "axios";

export const proxy = axios.create({
  baseURL: "https://notehub-api.goit.study", // прямий URL
  withCredentials: true,
});