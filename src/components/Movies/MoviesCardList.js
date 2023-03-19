import "./MoviesCardList.css";
import MoviesCard from "./MoviesCard";

function MoviesCardList({
  allMovies,
  savedMovies,
  onMoviesCardSave,
  onMoviesCardDelete,
  currentPath,
}) {

  return (
    <div className="contetn">
      <ul className="movie-grid">
        {allMovies.map((item) => (
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
        className="movie-grid__btn"
        type="button"
        aria-label="Еще показать фильмы"
      >
        Еще
      </button>
    </div>
  );
}

export default MoviesCardList;
