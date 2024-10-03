import Axios from "axios";

export const api = Axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BACKEND_URL ||
    "https://1e74-45-165-125-41.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
