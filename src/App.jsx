import { Suspense, lazy } from "react";
import LoginPage from "./pages/LoginPage";
import MovieListPage from "./pages/MovieListPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddMoviePage from "./pages/AddMoviePage";
import { Route, Routes } from "react-router-dom";

// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const SignupPage = lazy(() => import("./pages/SignupPage"));
// const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
// const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-movie" element={<AddMoviePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
