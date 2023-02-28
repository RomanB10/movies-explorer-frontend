import './SearchForm.css'
import FilterCheckBox from './FilterCheckBox';

function SearchForm(){
    return(
        <form className='form__search'>
            <fildset className='form__search_input-container'>
            <input className='form__search_item' type="text" placeholder='Фильм'></input>
            <button className='form__search_btn'></button>
            </fildset>
            <FilterCheckBox/>
        </form>
    )
}

export default SearchForm;