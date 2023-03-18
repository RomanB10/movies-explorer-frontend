import "./SearchForm.css";
import FilterCheckBox from "./FilterCheckBox";
import { useState, useEffect } from "react";

function SearchForm({onGetAllMovies}) {

  const [textRequest, setTextRequest] = useState('')// ТЕКСТ ЗАПРОСА
  const [positionCheckbox, setPositionCheckbox] = useState(false); //Состояние чекбокса
  

   // вносим данные поля
  function handleChangeTextRequest(evt) {
    setTextRequest(evt.target.value);
}
console.log(`textRequest in searsForm`, textRequest)

  function handleSubmit(event) {
    console.log('нажимаю')
    event.preventDefault();
    /*передаю запрос в BeatfilmMoviesApi с текстом запроса и состоянием чекбокса*/
    onGetAllMovies(textRequest,positionCheckbox);
}

  function toggleCheckbox(evt) {
    console.log('evt.target.checked',evt.target.checked)
    setPositionCheckbox(evt.target.checked);
    onGetAllMovies(textRequest,positionCheckbox);// выполнение запроса с изменным статусом короткометражки
}


useEffect(()=>{
  const textRequest = localStorage.getItem('textRequest');
  const positionCheckbox = localStorage.getItem('positionCheckbox');
  setTextRequest(textRequest);
  setPositionCheckbox(positionCheckbox);
},[])


  return (
    <form className="form__search"  onSubmit={handleSubmit}>
      <>
        <fildset className="form__search_input-container">
          <input
            className="form__search_item"
            type="text"
            placeholder="Фильм"
            name="movie"
            id="movie"
            tabIndex="1"
            value={textRequest || ""}
            onChange={ handleChangeTextRequest}
          ></input>
          <button className="form__search_btn" type='submit'></button>
        </fildset>
        <FilterCheckBox
         positionCheckbox ={positionCheckbox}
         onToggleCheckbox ={toggleCheckbox}
    />
      </>
    </form>
  );
}

export default SearchForm;
