import { Suspense, lazy, useReducer, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import { setTokenInStorage, getTokenFromStorage } from "./services/storage";
import { apiGetUserInfo } from "./services/api/user";
import { setAuthHearders } from "./services/api";

import MovieListPage from "./pages/MovieListPage";
import NotFoundPage from "./pages/NotFoundPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AddMoviePage = lazy(() => import("./pages/AddMoviePage"));
const MovieInfoPage = lazy(() => import("./pages/MovieInfoPage"));
const EditMoviePage = lazy(() => import("./pages/EditMoviePage"));

import PrivateRoute from "./components/PrivateRouter";

import StateContext from "./contexts/StateContext";
import DispatchContext from "./contexts/DispatchContext";

function App() {
  const initialState = {
    isLoggedIn: Boolean(getTokenFromStorage()),
    token: getTokenFromStorage(),
    user: null,
  };

  const appReducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          isLoggedIn: true,
          token: action.value,
        };
      case "logout":
        return {
          ...state,
          isLoggedIn: false,
          token: "",
          user: null,
        };
      case "set_user":
        return {
          ...state,
          user: action.value,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (state.token) {
      setTokenInStorage({ token: state.token });
      setAuthHearders({ accessToken: state.token });
    }
  }, [state.token]);

  useEffect(() => {
    if (!state.isLoggedIn) {
      setTokenInStorage({ token: "" });
      setAuthHearders({ accessToken: "" });
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    const getUserInfo = async () => {
      try {
        const { data } = await apiGetUserInfo({ cancelToken: request.token });
        dispatch({ type: "set_user", value: data });
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    if (state.isLoggedIn && state.token) {
      getUserInfo();
    }

    return () => request.cancel();
  }, [state.isLoggedIn, state.token]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MovieListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/add-movie"
              element={<PrivateRoute outlet={<AddMoviePage />} />}
            />
            <Route path="/info/:movieId" element={<MovieInfoPage />} />
            <Route
              path="/edit/:movieId"
              element={<PrivateRoute outlet={<EditMoviePage />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
