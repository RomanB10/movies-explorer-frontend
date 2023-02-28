import './MoviesCardList.css';
import MoviesCard from "./MoviesCard";
import image2 from "../../images/cardsMovies/2.png"
import image3 from "../../images/cardsMovies/3.png"
import image4 from "../../images/cardsMovies/4.png"
import image5 from "../../images/cardsMovies/5.png"
import image6 from "../../images/cardsMovies/6.png"
import image7 from "../../images/cardsMovies/7.png"
import image8 from "../../images/cardsMovies/8.png"
import image9 from "../../images/cardsMovies/9.png"
import image10 from "../../images/cardsMovies/10.png"
import image11 from "../../images/cardsMovies/11.png"
import image12 from "../../images/cardsMovies/12.png"

function MoviesCardList(){
    return(
        <div className='contetn'>
            <ul className='movie-grid'>
             <MoviesCard/>
             <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image2}
            />
            <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image3}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image4}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image5}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image6}
            />
            <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image7}
            />
            <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image8}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image9}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image10}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image11}
            />
            <button
              className='movie-card__btn movie-card__btn_type_saved'
              type="button"
              aria-label="Сохранить"
            />
      </li>
      <li className="movie-card">
            <div className='movie-card__heading-container'>
                <h2 className='movie-card__text'>В погоне за Бенкси</h2>
                <p className='movie-card__duration'>27 минут</p>
            </div>
            <img className="movie-card__image" alt={`Здесь должно быть изображение постера к фильму`}
                src={image12}
            />
            <button
              className='movie-card__btn'
              type="button"
              aria-label="Сохранить"
            >Сохранить</button>
      </li>
            </ul>
            <button className='movie-grid__btn' type="button"
              aria-label="Еще показать фильмы">Еще</button>
        </div>
    )
}

export default MoviesCardList;