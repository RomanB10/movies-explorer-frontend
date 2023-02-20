import './MoviesCardList.css';
import MoviesCard from "./MoviesCard";

function MoviesCardList(){
    return(
        <div className='contetn'>
            <ul className='movie-grid'>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <MoviesCard/>
             <button className='movie-grid__btn' type="button"
              aria-label="Еще показать">Еще</button>
            </ul>
        </div>
    )
}

export default MoviesCardList;