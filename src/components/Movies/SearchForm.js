import "./SearchForm.css";
import FilterCheckBox from "./FilterCheckBox";
import { useState, useEffect } from "react";
import useFormWithValidation from "../../utils/useFormWithValidation";

function SearchForm({ onGetAllMovies, onSearchSavedMovie, currentPath }) {
  const [textRequest, setTextRequest] = useState(""); // текст запроса на странице 'фильмы'
  const [textRequestSavedMovies, setTextRequestSavedMovies] = useState(""); // текст запроса на странице 'сохраненные фильмы'
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса
    
  // вносим данные поля
  function handleChangeTextRequest(evt) {
    if (currentPath === "/movies"){
    setTextRequest(evt.target.value);}
    else {
    setTextRequestSavedMovies(evt.target.value)}
  }

  function handleSubmit(event) {
    console.log("НАЖАЛ");
    event.preventDefault();
    if (currentPath === "/movies") {
      /*передаю запрос в BeatfilmMoviesApi с текстом запроса и состоянием чекбокса*/
      console.log('ПОИСК на /movies',textRequest, positionCheckbox)
      onGetAllMovies(textRequest, positionCheckbox);
    } else {
      /*передаю запрос в мой Api с текстом запроса и состоянием чекбокса*/
      /*console.log('выполняется поиск на /saved-movies',textRequest, positionCheckbox)
      onSearchSavedMovie(textRequest, positionCheckbox);*/
      console.log('ПОИСК на /saved-movies',textRequestSavedMovies, positionCheckbox)
      onSearchSavedMovie(textRequestSavedMovies, positionCheckbox);
    }
  }

  function toggleCheckbox(evt) {
    console.log("ПЕРЕКЛЮЧИЛ");
    console.log('Состояние toggle,',positionCheckbox)
    console.log("evt.target.checked", evt.target.checked);
    setPositionCheckbox(evt.target.checked);
    if (currentPath === "/movies") {
      console.log('toggle на /movies',textRequest, positionCheckbox)
      onGetAllMovies(textRequest, evt.target.checked);
    } // выполнение запроса с изменным статусом короткометражки
    else {
      /*console.log('выполняется toggle на /saved-movies',textRequest, positionCheckbox)
      onSearchSavedMovie(textRequest, positionCheckbox);*/
      console.log('toggle /saved-movies',textRequestSavedMovies, positionCheckbox)
      onSearchSavedMovie(textRequestSavedMovies, evt.target.checked);
    }
    return
  }

  useEffect(() => {
    const textRequest = localStorage.getItem("textRequest");
    const positionCheckbox = localStorage.getItem("positionCheckbox");
    const textRequestSavedMovies = localStorage.getItem("textRequestSavedMovies");
    setTextRequest(textRequest);
    /*setPositionCheckbox(positionCheckbox);*/
    setTextRequestSavedMovies(textRequestSavedMovies);
  
  if (JSON.parse(positionCheckbox) === true) {
    setPositionCheckbox(true);
  } else {
    setPositionCheckbox(false);
  }
  }, [setTextRequest,setPositionCheckbox,setTextRequestSavedMovies]);

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
            /* required*/
            title="Нужно ввести ключевое слово"
            tabIndex="1"
            /*value={currentPath ==='/movies'? textRequest: currentPath ==='/saved-movies'? textRequestSavedMovies:""}*/
            value={currentPath ==='/movies'? textRequest:textRequestSavedMovies}
            onChange={handleChangeTextRequest}
          ></input>
          <button className="form__search-btn" type="submit"></button>
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

/*
function SearchForm({ onGetAllMovies,onSearchSavedMovie,currentPath }) {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
    resetForm,
  } = useFormWithValidation();

  const [textRequest, setTextRequest] = useState(""); // ТЕКСТ ЗАПРОСА
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

  const errorName =
    errors.name === "" || errors.name === null || errors.name === "undefined"
      ? `form__search__input-error`
      : `form__input-error form__input-error_visible`;

  // вносим данные поля
  function handleChangeTextRequest(evt) {
    if (
      evt.target.value === "" ||
      evt.target.value === null ||
      evt.target.value === "undefined"
    ) {
      setTextRequest(values.movie);
      setIsValid(false);
      setErrors({
        errors: errors.name,
        [evt.target.name]: "Нужно ввести ключевое слово",
      });
      console.log(errors);
    } else {
      setIsValid(true);
      setTextRequest(values.movie);
     /* handleChange(evt);
    }
  }
  console.log("errors", errors);
  console.log("values", values);
  console.log(`textRequest in searsForm`, textRequest);

  function handleSubmit(event) {
    console.log("нажимаю");
    event.preventDefault();
    if (currentPath === "/movies"){
    /*передаю запрос в BeatfilmMoviesApi с текстом запроса и состоянием чекбокса
    onGetAllMovies(textRequest, positionCheckbox);}
    else {
    /*передаю запрос в мой Api с текстом запроса и состоянием чекбокса
    onSearchSavedMovie(textRequest, positionCheckbox)}
  }

  function toggleCheckbox(evt) {
    console.log("evt.target.checked", evt.target.checked);
    setPositionCheckbox(evt.target.checked);
    if (currentPath === "/movies"){
    onGetAllMovies(textRequest, positionCheckbox);} // выполнение запроса с изменным статусом короткометражки
    else{
      onSearchSavedMovie(textRequest, positionCheckbox)}
  }

  useEffect(() => {
    const textRequest = localStorage.getItem("textRequest");
    const positionCheckbox = localStorage.getItem("positionCheckbox");
    setTextRequest(textRequest);
    setPositionCheckbox(positionCheckbox);
  }, []);

  //ОЧИСТКА ФОРМЫ
  useEffect(() => {
    resetForm(textRequest, {}, false);
    if(savedMovies.length === 0) {
      setIsValid(true);
    } 
  }, [resetForm]);

  return (
    <form className="form__search" onSubmit={handleSubmit} noValidate>
      <>
        <fildset className="form__search_input-container">
          <input
            className="form__search_item"
            type="text"
            placeholder="Фильм"
            name="movie"
            id="movie"
            required
            title="Нужно ввести ключевое слово"
            tabIndex="1"
            value={values.movie || ""}
            onChange={handleChangeTextRequest}
          ></input>
          <button
            disabled={!isValid}
            className={
              isValid
                ? "form__search-btn"
                : "form__search-btn form__search-btn_type_inactive"
            }
            type="submit"
          ></button>
        </fildset>
        <span className={errorName}>{errors.movie}</span>
        <FilterCheckBox
          positionCheckbox={positionCheckbox}
          onToggleCheckbox={toggleCheckbox}
        />
      </>
    </form>
  );
}

export default SearchForm;
*/
