// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 5000, // Add timeout
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors (server not running)
    if (error.code === "ECONNABORTED" || !error.response) {
      return Promise.reject({
        message: "Network Error - Server may be down",
        isNetworkError: true,
      });
    }

    // Handle HTTP errors
    return Promise.reject({
      message: error.response.data?.message || "An error occurred",
      status: error.response.status,
      data: error.response.data,
    });
  }
);

export default api;

// //if backend works
// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/auth",
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
