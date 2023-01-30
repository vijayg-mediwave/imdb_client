import http from ".";

export function apiGetMovieList({ cancelToken }) {
  return http.get("/movies", { cancelToken });
}

export function apiAddMovie({ payload, cancelToken }) {
  return http.post("/movies", payload, { cancelToken });
}
