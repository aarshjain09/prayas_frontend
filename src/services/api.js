import axios from "axios";

const API = axios.create({
  baseURL: "https://vijay-ba-git-main-aarshjain09s-projects.vercel.app/api"
});

// ✅ Attach token WITHOUT touching Content-Type
API.interceptors.request.use(req => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
