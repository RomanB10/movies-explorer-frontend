import "./MoviesCard.css";
import SavedMoviesContext from "../contexts/SavedMoviesContext";
import { useContext, useEffect, useState } from "react";
import { imageUrl } from "../const-breakpoints";

function MoviesCard({
  movie,
  onMoviesCardSave,
  onMoviesCardDelete,
  currentPath,
  ...props
}) {

  const savedMovies = useContext(SavedMoviesContext);
  const [isSaved, setIsSaved] = useState(false); // стейт лайка

  function handelSaveClick() {
    onMoviesCardSave(movie);
    setIsSaved(true);
  }

  function handleDeleteClick() {
    console.log("СРАБОТАЛ УДАЛИТЬ", movie);
    onMoviesCardDelete(movie);
  }
  
  const movieSaveButtonClassName = `movie-card__btn ${
    isSaved && `movie-card__btn_type_saved`
  }`;
  const movieDeleteButtonClassName = `movie-card__btn movie-card__btn_type_deleted`;

  useEffect(() => {
    const isSaved = savedMovies.some((item) => item.movieId === props.id);
    if (isSaved) {
      setIsSaved(true);
    }
  }, [setIsSaved, props.id]);

  console.log(`${imageUrl}${movie.image.url}`);
  return (
    <li className="movie-card">
      <div className="movie-card__heading-container">
        <h2 className="movie-card__text">{movie.nameRU}</h2>
        <p className="movie-card__duration">{movie.duration}</p>
      </div>
      <img
        className="movie-card__image"
        alt={`Здесь должно быть изображение постера к фильму "${movie.nameRU}"`}
        src={
          currentPath === "/movies"
            ? `${imageUrl}${movie.image.url}`
            : currentPath === "/saved-movies"
            ? `${movie.image}`
            : ""
        }
      />
      <div className="movie-card__ending-container">
        <button
          className={
            currentPath === "/movies"
              ? movieSaveButtonClassName
              : movieDeleteButtonClassName
          }
          type="button"
          aria-label="Сохранить"
          onClick={
            currentPath === "/movies" ? handelSaveClick : handleDeleteClick
          }
        >
          Сохранить
        </button>
      </div>
    </li>
  );
}

export default MoviesCard;

/*
<button
              className="movie-card__btn"
              type="button"
              aria-label="Сохранить"
            >
              Сохранить
            </button>
         


                      <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
          */
