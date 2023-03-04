import './MoviesCard.css';
import movieImage from '../../images/cardsMovies/1.png';

function MoviesCard(){
    return(
        <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={movieImage}
            />
            <div className='movie-card__ending-container'>
            <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
            </div>
      </li>
    )
}

export default MoviesCard;