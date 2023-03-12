import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm";
import MoviesCard from "../Movies/MoviesCard";
/*import SavedMoviesContext from "../contexts/SavedMoviesContext";
import { useContext } from "react";*/

function SavedMovies({savedMovies,currentPath,onMoviesCardDelete}) {

  
  return (
    <section className="movies-container">
      <SearchForm />
      <div className="contetn">
        <ul className="movie-grid">
        {savedMovies.map((item)=>(
          <MoviesCard 
          key = {item.id || item.movieId}
          movie = {item}
          currentPath={currentPath}
          onMoviesCardDelete ={onMoviesCardDelete}
          {...item}
          />
        ))}
        </ul>
        <button className='movie-grid__btn movie-grid__btn_type_hidden' type="button"
              aria-label="Еще показать фильмы">Еще</button>
      </div>
    </section>
  );
}

export default SavedMovies;
