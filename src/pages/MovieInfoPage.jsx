import React, { useState, useMemo, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../components/Loading";
import Goback from "../components/Goback";
import Rating from "../components/Rating";

import { apiGetMovieInfo, apiDeleteMovie } from "../services/api/movie";
import { formatDate } from "../services/utils";
import StateContext from "../contexts/StateContext";

const MovieInfoPage = () => {
  const navigate = useNavigate();
  const appState = useContext(StateContext);

  const [isLoading, setIsLoading] = useState(false);

  const [movieInfo, setMovieInfo] = useState({
    name: "",
    createdUserInfo: {},
    updatedAt: "",
  });

  const [deleteMovie, setDeleteMovie] = useState(false);

  let { movieId } = useParams();

  //console.log(movieId);

  useEffect(() => {
    const request = axios.CancelToken.source();
    const getMovieInfo = async () => {
      setIsLoading(true);
      try {
        const { data: movieData } = await apiGetMovieInfo({
          movieId,
          cancelToken: request.token,
        });
        console.log(movieData);
        setMovieInfo(movieData);
      } catch (error) {
        console.log(error);
        //Handle Error
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      console.log("movie info with", movieId);
      getMovieInfo();
    }

    return () => {
      request.cancel();
    };
  }, [movieId]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    const callDeleteMovie = async () => {
      setIsLoading(true);
      try {
        await apiDeleteMovie({
          movieId: movieInfo.id,
          cancelToken: request.token,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        //Handle Error
      } finally {
        setIsLoading(false);
      }
    };

    if (deleteMovie) {
      console.log("delete", movieInfo.id);
      callDeleteMovie();
    }

    return () => {
      request.cancel();
    };
  }, [deleteMovie, movieInfo.id]);

  const pageTitle = useMemo(() => {
    if (movieInfo) {
      console.log(movieInfo.name);
      return `info on ${movieInfo.name}`;
    } else {
      return "...";
    }
  }, [movieInfo.name]);

  const canEdit = useMemo(() => {
    if (
      appState.isLoggedIn &&
      appState.user.id === movieInfo.createdUserInfo.id
    ) {
      return true;
    }
    return false;
  }, [appState.isLoggedIn, movieInfo.createdUserInfo.id]);

  const handleDelete = () => {
    setDeleteMovie(true);
  };

  return (
    <Page title={pageTitle}>
      {isLoading && <Loading />}

      {movieInfo && (
        <article>
          <Goback />
          <h2>{movieInfo.name}</h2>
          <p>
            <strong>genre:</strong> {movieInfo.genre}
          </p>
          <p>
            <strong>language:</strong> {movieInfo.language}
          </p>
          <p>
            <strong>year:</strong> {movieInfo.yearOfRelease}
          </p>
          <p>
            <strong>last update:</strong> {formatDate(movieInfo.updatedAt)}
          </p>

          <p>
            <Rating count={movieInfo.rating} />
          </p>

          <p>
            <strong>Created by:</strong> {movieInfo.createdUserInfo.name}
          </p>
          {canEdit && (
            <>
              <button onClick={() => navigate(`/edit/${movieInfo.id}`)}>
                Edit
              </button>
              <button
                style={{ background: " #e53935" }}
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </button>
            </>
          )}
        </article>
      )}
    </Page>
  );
};

export default MovieInfoPage;
