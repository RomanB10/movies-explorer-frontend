import "./Movies.css";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
/*import Preloader from "./Preloader";*/

function Movies({
  allMovies,
  savedMovies,
  onMoviesCardSave,
  onMoviesCardDelete,
  onGetAllMovies,
  currentPath,
}) {
  return (
    <section className="movies-container">
      <SearchForm onGetAllMovies={onGetAllMovies} />
      <MoviesCardList
        allMovies={allMovies}
        savedMovies ={savedMovies}
        onMoviesCardSave={onMoviesCardSave}
        onMoviesCardDelete={onMoviesCardDelete}
        currentPath={currentPath}
      />
    </section>
  );
}

export default Movies;
