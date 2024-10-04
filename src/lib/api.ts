import Axios from "axios";

export const api = Axios.create({
  baseURL: "https://planner-backend-zeta.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
