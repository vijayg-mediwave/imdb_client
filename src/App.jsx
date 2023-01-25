import { Suspense, lazy, useReducer } from "react";
import MovieListPage from "./pages/MovieListPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));

import StateContext from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";

function App() {
  const initialState = {
    isLoggedIn: false,
    user: null,
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoggedIn: true,
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MovieListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/add-movie" element={<AddMoviePage />} />
            <Route path="/info/:movieId" element={<MovieInfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
