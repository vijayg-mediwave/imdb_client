import http from ".";

export const apiLogin = ({ payload, cancelToken }) => {
  return http.post("/users/login", payload, { cancelToken });
};
export const apiGetUserInfo = ({ payload, cancelToken }) => {
  return http.get("/users/info", { cancelToken });
};
