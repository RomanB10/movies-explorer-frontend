import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm";
import MoviesCard from "../Movies/MoviesCard";
import Preloader from "../Movies/Preloader";

function SavedMovies({
  isLoading,
  savedMovies,
  searchedSavedMovies,
  currentPath,
  onMoviesCardDelete,
  onSearchSavedMovie,
}) {
  

  console.log(`searchedSavedMovies.length`,searchedSavedMovies.length)
  console.log(`savedMovies.length `,savedMovies.length )
  return (
    <section className="movies-container">
      <SearchForm onSearchSavedMovie={onSearchSavedMovie} isLoading={isLoading}/>
      {isLoading? <Preloader/>: (searchedSavedMovies.length === 0 ) ? 
        <p className="movies-container__text-search-result">
          Ничего не найдено
        </p>
       :
      <div className="contetn">
        <ul className="movie-grid">
          {searchedSavedMovies.length > 0
            ? searchedSavedMovies.map((item) => (
                <MoviesCard
                  key={item.id || item.movieId}
                  movie={item}
                  currentPath={currentPath}
                  onMoviesCardDelete={onMoviesCardDelete}
                  {...item}
                />
              ))
            : savedMovies.map((item) => (
                <MoviesCard
                  key={item.id || item.movieId}
                  movie={item}
                  currentPath={currentPath}
                  onMoviesCardDelete={onMoviesCardDelete}
                  {...item}
                />
              ))}
        </ul>
        <button
          className="movie-grid__btn movie-grid__btn_type_hidden"
          type="button"
          aria-label="Еще показать фильмы"
        >
          Еще
        </button>
      </div>}
    </section>
  );
}

export default SavedMovies;
