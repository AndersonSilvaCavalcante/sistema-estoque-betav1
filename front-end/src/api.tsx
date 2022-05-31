import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44382",
});

export { api };
