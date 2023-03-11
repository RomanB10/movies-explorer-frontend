import "./FilterCheckBox.css";

function FilterCheckBox() {
  return (
    <div className="checkbox-conteiner">
    <label className="checkbox-ios">
      <input type="checkbox" />
      <span className="checkbox-ios-switch"></span>Короткометражки
    </label>
    </div>
  );
}

export default FilterCheckBox;
