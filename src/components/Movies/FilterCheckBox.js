import "./FilterCheckBox.css";

function FilterCheckBox({ positionCheckbox, onToggleCheckbox }) {
  return (
    <div className="checkbox-conteiner">
      <label className="checkbox-ios">
        <input
          type="checkbox"
          name="checkbox"
          value={positionCheckbox || false}
          onChange={onToggleCheckbox}
        />
        <span className="checkbox-ios-switch"></span>Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckBox;
