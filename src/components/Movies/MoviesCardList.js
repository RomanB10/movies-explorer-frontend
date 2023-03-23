import "./MoviesCardList.css";
import MoviesCard from "./MoviesCard";

function MoviesCardList({
  moviesList,
  savedMovies,
  onMoviesCardSave,
  onMoviesCardDelete,
  currentPath,
  elseButton,
  onHandleLoadMoreMovies,
}) {
 /* console.log(`moviesList`,moviesList)*/
  return (
    <div className="contetn">
      <ul className="movie-grid">
        {moviesList.map((item) => (
          <MoviesCard
            key={item.id || item._id}
            movie={item}
            savedMovies ={savedMovies}
            onMoviesCardSave={onMoviesCardSave}
            onMoviesCardDelete={onMoviesCardDelete}
            currentPath={currentPath}
            {...item}
            />
         ))}
               </ul>
      <button
        className={elseButton?`movie-grid__btn`: `movie-grid__btn movie-grid__btn_type_hidden`}
        type="button"
        aria-label="Еще показать фильмы"
        onClick = {onHandleLoadMoreMovies}
      >
        Еще
      </button>
    </div>
  );
}

export default MoviesCardList;
