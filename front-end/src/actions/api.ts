import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7177/"
})

export default api