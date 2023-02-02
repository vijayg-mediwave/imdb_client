import React, { useMemo, useState, useEffect } from "react";
import { useImmer } from "use-immer";
import axios from "axios";

import Page from "../components/Page";
import Loading from "../pages/LoginPage";
import Goback from "../components/Goback";
import Modal from "../components/Modal";
import Form from "../components/Form";

import { apiAddMovie } from "../services/api/movie";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  //const [isLoading, setIsLoading] = useState(false);

  const [newMovie, setNewMovie] = useImmer({
    name: "",
    //genre: "",
    language: "",
    yearOfRelease: 0,
    genreList: [],
    isLoading: false,
    callApi: false,
    apiStatus: {
      show: false,
      type: "success", // success,error,
      message: "",
    },
  });

  //console.log(newMovie);

  const navigate = useNavigate();

  //const genres = ["Horror", "Scifi", "Romance", "Adventure", "Crime"];
  //const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  const isValid = useMemo(() => {
    if (
      newMovie.name &&
      newMovie.genreList.length &&
      newMovie.language &&
      newMovie.yearOfRelease
    ) {
      return true;
    }
    return false;
  }, [
    newMovie.name,
    newMovie.genreList.length,
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
        const payload = {
          name: newMovie.name,
          language: newMovie.language,
          yearOfRelease: newMovie.yearOfRelease,
          genre: newMovie.genreList.map((g) => g.toLowerCase()).join(","),
        };
        // console.log(payload);
        // return;
        const { data } = await apiAddMovie({
          payload: {
            ...payload,
          },
          cancelToken: request.token,
        });
        console.log(data);
        resetState();
        navigate("/");
        // setNewMovie((draft) => {
        //   draft.apiStatus.type = "success";
        //   draft.apiStatus.message = "Movie added successfully!";
        //   draft.apiStatus.show = true;
        // });
        //TODO show a success modal, and on its onClick,navigate to the movie list page
      } catch (error) {
        //TODO show error in UI
        //setError(`failed to do login`);
        console.log(error);
        if (error.response && error.response.data.message) {
          setNewMovie((draft) => {
            draft.apiStatus.type = "error";
            draft.apiStatus.message = error.response.data.message;
            draft.apiStatus.show = true;
          });
        }
      } finally {
        setNewMovie((draft) => {
          draft.isLoading = false;
          draft.callApi = false;
        });
      }
      // resetnewMovie();
    };
    if (
      newMovie.name &&
      newMovie.genreList.length &&
      newMovie.language &&
      newMovie.yearOfRelease &&
      newMovie.callApi
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

  const resetState = () => {
    setNewMovie((draft) => {
      //console.log("came");
      draft.name = "";
      draft.language = "";
      draft.yearOfRelease = 0;
      draft.genreList = [];
      draft.isLoading = false;
      draft.callApi = false;
    });
  };

  const handleChange = ({ e, field }) => {
    if (field === "name") {
      setNewMovie((draft) => {
        draft.name = e.target.value;
      });
    } else if (field === "genre") {
      //console.log(e.target.value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewMovie((draft) => {
      draft.callApi = true;
    });
  };

  const clearApiStatus = () => {
    if (newMovie.apiStatus.type == "success" && newMovie.apiStatus.show) {
      navigate("/");
    } else {
      setNewMovie((draft) => {
        draft.apiStatus.show = false;
        draft.apiStatus.type = "success";
        draft.apiStatus.message = "";
      });
    }
  };

  return (
    <Page title="Add new movie">
      {newMovie.isLoading && <Loading />}

      <Goback />

      {newMovie.apiStatus.show && (
        <Modal
          type={newMovie.apiStatus.type}
          message={newMovie.apiStatus.message}
          onClick={clearApiStatus}
        />
      )}

      <h1>Add new movie</h1>

      <Form
        movie={{
          genreList: newMovie.genreList,
          language: newMovie.language,
          name: newMovie.name,
          yearOfRelease: newMovie.yearOfRelease,
        }}
        onNameChange={(e) => handleChange({ e, field: "name" })}
        onGenreChange={(e) => handleChange({ e, field: "genre" })}
        onLanguageChange={(e) => handleChange({ e, field: "language" })}
        onYearOfReleaseChange={(e) =>
          handleChange({ e, field: "yearOfRelease" })
        }
      />
      <button
        type="submit"
        aria-busy={newMovie.isLoading}
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Add movie
      </button>
    </Page>
  );
};

export default AddMoviePage;
