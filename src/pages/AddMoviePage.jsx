import React, { useMemo, useState, useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../pages/LoginPage";
import Goback from "../components/Goback";
import { apiAddMovie } from "../services/api/movie";

const AddMoviePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [newMovie, setNewMovie] = useImmer({
    name: "",
    //genre: "",
    language: "",
    yearOfRelease: 0,
    genreList: [],
    isLoading: false,
    callApi: false,
  });

  const genres = ["Horror", "Sci-fi", "Romance", "Adventure", "Crime"];
  const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  const handleChange = ({ e, field }) => {
    if (field === "name") {
      setNewMovie((draft) => {
        draft.name = e.target.value;
      });
    } else if (field === "genre") {
      setNewMovie((draft) => {
        draft.genreList.push(e.target.value);
      });
    } else if (field === "language") {
      setNewMovie((draft) => {
        draft.language = e.target.value;
      });
    } else if (field === "yearOfRelease") {
      setNewMovie((draft) => {
        draft.yearOfRelease = e.target.value;
      });
    }
  };

  const isValid = useMemo(() => {
    if (
      newMovie.name &&
      newMovie.genreList &&
      newMovie.language &&
      newMovie.yearOfRelease
    ) {
      return true;
    }
    return false;
  }, [
    newMovie.name,
    newMovie.genreList,
    newMovie.language,
    newMovie.yearOfRelease,
  ]);

  useEffect(() => {
    const request = axios.CancelToken.source();

    const doNewMovieSubmit = async () => {
      setNewMovie((draft) => {
        draft.isLoading = true;
      });
      try {
        const { data } = await apiAddMovie({
          payload: {
            name: newMovie.name,
            language: newMovie.language,
            yearOfRelease: newMovie.yearOfRelease,
            genreList: newMovie.genreList,
          },
          cancelToken: request.token,
        });
        resetnewMovie();
      } catch (error) {
        //setError(`failed to do login`);
        console.log(error);
      } finally {
        setNewMovie((draft) => {
          draft.isLoading = false;
        });
      }
    };
    if (
      newMovie.callApi &&
      newMovie.name &&
      newMovie.genreList.length &&
      newMovie.language &&
      newMovie.yearOfRelease
    ) {
      doNewMovieSubmit();
    }

    return () => {
      //console.log("component unmounted");
      request.cancel();
    };
  }, [
    newMovie.callApi,
    newMovie.name,
    newMovie.genreList.length,
    newMovie.language,
    newMovie.yearOfRelease,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewMovie((draft) => {
      draft.callApi = true;
    });
  };

  const resetnewMovie = () => {
    setNewMovie((draft) => {
      draft.name = "";
      draft.language = "";
      draft.yearOfRelease = 0;
      draft.genreList = [];
      draft.isLoading = false;
      draft.callApi = false;
    });
  };

  return (
    <Page title="Add new movie">
      {isLoading && <Loading />}

      <Goback />

      <h1>Add new movie</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="movie-name">
          Name
          <input
            type="text"
            id="movie-name"
            name="movie-name"
            placeholder="Movie name"
            required
            value={newMovie.name}
            onChange={(e) => handleChange({ e, field: "name" })}
          />
        </label>

        <fieldset>
          <legend>Genre</legend>
          {genres.map((g) => (
            <label htmlFor={`checkbox-${g}`} key={g}>
              <input
                type="checkbox"
                id={`checkbox-${g}`}
                name={`checkbox-${g}`}
                value={g}
                onChange={(e) => handleChange({ e, field: "genre" })}
                checked={newMovie.genreList.includes(g)}
              />
              {g}
            </label>
          ))}
        </fieldset>

        <label htmlFor="movie-lang">
          Language
          <select
            id="movie-lang"
            name="movie-lang"
            required=""
            defaultValue={newMovie.language}
            onChange={(e) => handleChange({ e, field: "language" })}
          >
            <option disabled>Select…</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="movie-year">
          Year
          <input
            type="number"
            id="movie-year"
            name="movie-year"
            placeholder="Year of release"
            required
            value={newMovie.yearOfRelease}
            onChange={(e) => handleChange({ e, field: "yearOfRelease" })}
          />
        </label>

        <button
          type="submit"
          aria-busy={newMovie.isLoading}
          disabled={!isValid}
        >
          Add movie
        </button>
      </form>
    </Page>
  );
};

export default AddMoviePage;
