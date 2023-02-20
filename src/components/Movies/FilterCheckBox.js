import "./FilterCheckBox.css";

function FilterCheckBox() {
  return (
    <div className="checkbox-conteiner">
    <label class="checkbox-ios">
      <input type="checkbox" />
      <span class="checkbox-ios-switch"></span>Короткометражки
    </label>
    </div>
  );
}

export default FilterCheckBox;
/*
<div className='checkbox'>
<input className='custom-checkbox' type="checkbox" name="checkbox" value="yes"></input>
<label for="checkbox">Короткометражки</label>
</div>*/

/*


<div className="checkbox-conteiner">
<input
  className="checkbox"
  type="checkbox"
  name="checkbox"
  value="yes"
></input>
<label for="checkbox-ios">Короткометражки</label>
</div>*/
