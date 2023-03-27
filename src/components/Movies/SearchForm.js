import "./SearchForm.css";
import FilterCheckBox from "./FilterCheckBox";
import { useState, useEffect } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";

function SearchForm({ onGetAllMovies, onSearchSavedMovie, currentPath, isLoading }) {
  const [textRequest, setTextRequest] = useState(""); // текст запроса на странице 'фильмы'
  const [textRequestSavedMovies, setTextRequestSavedMovies] = useState(""); // текст запроса на странице 'сохраненные фильмы'
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса

  // вносим данные поля
  function handleChangeTextRequest(evt) {
    if (currentPath === "/movies") {
      setTextRequest(evt.target.value);
    } else {
      setTextRequestSavedMovies(evt.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (currentPath === "/movies") {
      /*передаю запрос в BeatfilmMoviesApi с текстом запроса и состоянием чекбокса*/
      onGetAllMovies(textRequest, positionCheckbox);
    } else {
      /*передаю запрос в мой Api с текстом запроса и состоянием чекбокса*/
      onSearchSavedMovie(textRequestSavedMovies, positionCheckbox);
    }
  }

  function toggleCheckbox(evt) {
    setPositionCheckbox(evt.target.checked);
    if (currentPath === "/movies") {
      onGetAllMovies(textRequest, evt.target.checked);
    } // выполнение запроса с изменным статусом короткометражки
    else {
      onSearchSavedMovie(textRequestSavedMovies, evt.target.checked);
    }
    return;
  }

  useEffect(() => {
    const textRequest = localStorage.getItem("textRequest");
    const positionCheckbox = localStorage.getItem("positionCheckbox");
    const textRequestSavedMovies = localStorage.getItem(
      "textRequestSavedMovies"
    );
    setTextRequest(textRequest);
    setTextRequestSavedMovies(textRequestSavedMovies);

    if (JSON.parse(positionCheckbox) === true) {
      setPositionCheckbox(true);
    } else {
      setPositionCheckbox(false);
    }
  }, [setTextRequest, setPositionCheckbox, setTextRequestSavedMovies]);

  return (
    <form className="form__search" onSubmit={handleSubmit}>
      <>
        <fildset className="form__search_input-container">
          <input
            className="form__search_item"
            type="text"
            placeholder="Фильм"
            name="movie"
            id="movie"
            /*required*/
            title="Нужно ввести ключевое слово"
            tabIndex="1"
            disabled= {isLoading}
            value={
              currentPath === "/movies" ? textRequest : textRequestSavedMovies
            }
            onChange={handleChangeTextRequest}
          ></input>
          <button disabled= {isLoading} className="form__search-btn" type="submit"></button>
        </fildset>
        <FilterCheckBox
          positionCheckbox={positionCheckbox}
          onToggleCheckbox={toggleCheckbox}
        />
      </>
    </form>
  );
}

export default SearchForm;