import "./Movies.css";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";

function Movies({
  isLoading,
  moviesList,
  savedMovies,
  onMoviesCardSave,
  onMoviesCardDelete,
  onGetAllMovies,
  currentPath,
  elseButton,
  onSearchSavedMovie,
  onHandleLoadMoreMovies,
}) {
  return (
    <section className="movies-container">
      <SearchForm onGetAllMovies={onGetAllMovies} currentPath={currentPath} isLoading={isLoading}/>
      <MoviesCardList
        isLoading={isLoading}
        moviesList={moviesList}
        savedMovies={savedMovies}
        onMoviesCardSave={onMoviesCardSave}
        onMoviesCardDelete={onMoviesCardDelete}
        currentPath={currentPath}
        elseButton={elseButton}
        onSearchSavedMovie={onSearchSavedMovie}
        onHandleLoadMoreMovies={onHandleLoadMoreMovies}
      />
    </section>
  );
}

export default Movies;
