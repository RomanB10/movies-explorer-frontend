import "./Movies.css";
import SearchForm from "./SearchForm";
import MoviesCardList from "./MoviesCardList";
/*import Preloader from "./Preloader";*/

function Movies() {
  return (
    <section className="movies-container conteiner-padding">
      <SearchForm />
      <MoviesCardList />
    </section>
  );
}

export default Movies;
