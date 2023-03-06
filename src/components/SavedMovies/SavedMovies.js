import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm";
import image1 from "../../images/cardsMovies/1.png";
import image2 from "../../images/cardsMovies/2.png";
import image3 from "../../images/cardsMovies/3.png";

function SavedMovies() {
  return (
    <section className="movies-container">
      <SearchForm />
      <div className="contetn">
        <ul className="movie-grid">
          <li className="movie-card">
            <div className="movie-card__heading-container">
              <h2 className="movie-card__text">В погоне за Бенкси</h2>
              <p className="movie-card__duration">27 минут</p>
            </div>
            <img
              className="movie-card__image"
              alt={`Здесь должно быть изображение постера к фильму`}
              src={image1}
            />
            <div className='movie-card__ending-container'>
            <button
              className="movie-card__btn movie-card__btn_type_deleted"
              type="button"
              aria-label="Сохранить"
            />
            </div>
          </li>
          <li className="movie-card">
            <div className="movie-card__heading-container">
              <h2 className="movie-card__text">В погоне за Бенкси</h2>
              <p className="movie-card__duration">27 минут</p>
            </div>
            <img
              className="movie-card__image"
              alt={`Здесь должно быть изображение постера к фильму`}
              src={image2}
            />
            <div className='movie-card__ending-container'>
            <button
              className="movie-card__btn movie-card__btn_type_deleted"
              type="button"
              aria-label="Сохранить"
            />
            </div>
          </li>
          <li className="movie-card">
            <div className="movie-card__heading-container">
              <h2 className="movie-card__text">В погоне за Бенкси</h2>
              <p className="movie-card__duration">27 минут</p>
            </div>
            <img
              className="movie-card__image"
              alt={`Здесь должно быть изображение постера к фильму`}
              src={image3}
            />
            <div className='movie-card__ending-container'>
            <button
              className="movie-card__btn movie-card__btn_type_deleted"
              type="button"
              aria-label="Сохранить"
            >
            </button>
            </div>
          </li>
        </ul>
        <button className='movie-grid__btn movie-grid__btn_type_hidden' type="button"
              aria-label="Еще показать фильмы">Еще</button>
      </div>
    </section>
  );
}

export default SavedMovies;
/*
    <div className="contetn">
      <ul className="movie-grid">
      <li className="movie-card">
          <div className="movie-card__heading-container">
            <h2 className="movie-card__text">В погоне за Бенкси</h2>
            <p className="movie-card__duration">27 минут</p>
          </div>
          <img
            className="movie-card__image"
            alt={`Здесь должно быть изображение постера к фильму`}
            src={image1}
          />
          <button
            className="movie-card__btn movie-card__btn_saved"
            type="button"
            aria-label="Сохранить"
          />
        </li>
        <li className="movie-card">
          <div className="movie-card__heading-container">
            <h2 className="movie-card__text">В погоне за Бенкси</h2>
            <p className="movie-card__duration">27 минут</p>
          </div>
          <img
            className="movie-card__image"
            alt={`Здесь должно быть изображение постера к фильму`}
            src={image2}
          />
          <button
            className="movie-card__btn movie-card__btn_saved"
            type="button"
            aria-label="Сохранить"
          />
        </li>
        <li className="movie-card">
          <div className="movie-card__heading-container">
            <h2 className="movie-card__text">В погоне за Бенкси</h2>
            <p className="movie-card__duration">27 минут</p>
          </div>
          <img
            className="movie-card__image"
            alt={`Здесь должно быть изображение постера к фильму`}
            src={image3}
          />
          <button
            className="movie-card__btn"
            type="button"
            aria-label="Сохранить"
          >
            Сохранить
          </button>
        </li>
      </ul>
    </div>
    */
