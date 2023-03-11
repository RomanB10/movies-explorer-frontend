import "./SearchForm.css";
import FilterCheckBox from "./FilterCheckBox";
import { useState } from "react";

function SearchForm({onGetAllMovies}) {
  // переменная состояния пойска
  const [search, setSearch] = useState("");

  function handleChangeSearch(event) {
    console.log('нажимаю инпут')
    setSearch(event.target.value);
    console.log('search',search)
  }

  function handleSubmit(event) {
      console.log('нажимаю')
    event.preventDefault();
    onGetAllMovies();
  }

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
            value={search || ""}
            onChange={handleChangeSearch}
          ></input>
          <button className="form__search_btn" type="button"></button>
        </fildset>
        <FilterCheckBox 
    />
      </>
    </form>
  );
}

export default SearchForm;
