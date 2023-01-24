import axios from "axios";

const http = axios.create({
  baseURL: `/api`,
  timeout: 20000,
  headers: {
    "content-Type": "application/json",
  },
});

export const setAuthHearders = ({ accessToken }) => {
  if (accessToken) {
    http.defaults.headers.common["Authorization"] = `Bearer${accessToken}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
};

export default http;
