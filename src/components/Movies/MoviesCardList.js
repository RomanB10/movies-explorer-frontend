import "./MoviesCardList.css";
import MoviesCard from "./MoviesCard";
import Preloader from "./Preloader";

function MoviesCardList({
  isLoading,
  moviesList,
  savedMovies,
  onMoviesCardSave,
  onMoviesCardDelete,
  currentPath,
  elseButton,
  onHandleLoadMoreMovies,
}) {
 /* console.log(`moviesList`,moviesList)*/
 console.log('isLoading',isLoading)
 console.log('moviesList.length',moviesList.length)
  return (
    
    <>
    {!isLoading && moviesList.length === 0 && <p className="movies-container__text-search-result">Ничего не найдено</p>}
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
    </>
        
  );
}

export default MoviesCardList;
