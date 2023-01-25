import http from ".";

export const apiLogin = ({payload,cancelToken})=>{
    return http.post("/users/login",payload,{cancelToken})
}