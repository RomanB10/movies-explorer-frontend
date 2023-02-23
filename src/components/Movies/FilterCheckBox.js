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
