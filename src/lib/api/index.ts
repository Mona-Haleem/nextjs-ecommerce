import axios from "axios";
import { env } from "process";

export const Data_URL = "https://dummyjson.com";
export const SERVER_URL = env.NEXT_PUBLIC_API_URL ;
// Create axios instance for API calls
export const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
