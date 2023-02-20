import './MoviesCard.css';
import movieImage from '../../images/pic__COLOR_pic.png';

function MoviesCard(){
    return(
        <li className="movie-conteiner">
            <div className='movie-conteiner__heading'>
                <h2 className='movie-conteiner__text'>В погоне за Бенкси</h2>
                <p className='movie-conteiner__duration'>27 минут</p>
            </div>
            <img className="movie-conteiner__image" alt={`Здесь должно быть изображение`}
                src={movieImage}
            />
            <button
              className='movie-conteiner__btn'
              type="button"
              aria-label="Сохранить"
            />
      </li>
    )
}

export default MoviesCard;