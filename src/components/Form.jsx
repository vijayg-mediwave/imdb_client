import React from "react";

const Form = (props) => {
  const {
    movie,
    onNameChange,
    onGenreChange,
    onLanguageChange,
    onYearOfReleaseChange,
  } = props;
  const genres = ["Horror", "Scifi", "Romance", "Adventure", "Crime"];
  const languages = ["English", "Tamil", "Hindi", "French", "Telugu"];

  return (
    <form>
      <label htmlFor="movie-name">
        Name
        <input
          type="text"
          id="movie-name"
          name="movie-name"
          placeholder="Movie name"
          required
          value={movie.name}
          onChange={onNameChange}
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
              onChange={onGenreChange}
              value={g}
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
          onChange={onLanguageChange}
          value={movie.language}
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
          onChange={onYearOfReleaseChange}
          value={movie.yearOfRelease}
        />
      </label>
    </form>
  );
};

export default Form;
