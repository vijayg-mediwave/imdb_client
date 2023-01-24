import http from ".";

export function apiGetMovieList({ cancelToken }) {
  return http.get(
    "/movies"
    //{ cancelToken }
  );
}
