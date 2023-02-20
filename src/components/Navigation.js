import "./Navigation.css";

function Navigation() {
  return (
    <ul className="header__nav">
      <li>
        {" "}
        <p className="header__link">Фильмы</p>
      </li>
      <li>
        {" "}
        <p className="header__link">Сохраненные фильмы</p>
      </li>
      <li>
        <div className="header__profile">
          <p className="header__link">Аккаунт</p>
          <button className="header__link header__button"></button>
        </div>
      </li>
    </ul>
  );
}

export default Navigation;
