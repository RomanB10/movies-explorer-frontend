import "./MoviesCard.css";
import SavedMoviesContext from "../contexts/SavedMoviesContext";
import { useContext, useEffect, useState } from "react";
import { IMAGE_URL } from "../../utils/constants";

function MoviesCard({
  movie,
  onMoviesCardSave,
  onMoviesCardDelete,
  currentPath,
  ...props
}) {
  const savedMovies = useContext(SavedMoviesContext);
  const [isSaved, setIsSaved] = useState(false); // стейт лайка

  //Продолжительность фильма
  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration - hours * 60;
  const movieDuration = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  //выполено сохранение
  function handelSaveClick() {
    if (!isSaved) {
      setIsSaved(true);
      onMoviesCardSave(movie);
    }
    if (isSaved) {
      setIsSaved(false);
      console.log("передали на удаление movie", movie);
      onMoviesCardDelete(savedMovies.filter((i) => i.movieId === movie.id)[0]);
    } else {
      setIsSaved(true);
    }
  }

  //выполнено удаление
  function handleDeleteClick() {
    console.log("СРАБОТАЛ УДАЛИТЬ", movie);
    setIsSaved(false);
    onMoviesCardDelete(movie);
  }

  const movieSaveButtonClassName = `movie-card__btn  ${
    isSaved && `movie-card__btn_type_saved`
  }`;
  const movieDeleteButtonClassName = `movie-card__btn movie-card__btn_type_deleted`;

  useEffect(() => {
    const isSaved = savedMovies.some((movie) => movie.movieId === props.id);
    if (isSaved) {
      setIsSaved(true);
    }
    return;
  }, [setIsSaved, props.id]);

  return (
    <li className="movie-card">
      <div className="movie-card__heading-container">
        <h2 className="movie-card__text">{movie.nameRU}</h2>
        <p className="movie-card__duration">{movieDuration}</p>
      </div>
      <a
        className="movie-card__link-image"
        target="_blank"
        href={movie.trailerLink}
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          alt={`Здесь должно быть изображение постера к фильму "${movie.nameRU}"`}
          src={
            currentPath === "/movies"
              ? `${IMAGE_URL}${movie.image.url}`
              : currentPath === "/saved-movies"
              ? `${movie.image}`
              : ""
          }
        />
      </a>
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
