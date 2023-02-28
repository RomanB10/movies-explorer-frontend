import "./Navigation.css";
import { Link, Route, Switch } from "react-router-dom";

function Navigation() {
  return (
    <ul className="navigation">

      <Switch>
        <Route exact path="/">
          <li>
            <Link
              to="/signup"
              className="navigation__link navigation__link_text_small-size"
            >
              Регистрация
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="navigation__link navigation__link_text_small-size navigation__link_type_enter"
            >
              Войти
            </Link>
          </li>
        </Route>

        <Route exact path="/movies">
          <li>
            <Link to="/movies" className="navigation__link">
              Фильмы
            </Link>
          </li>
          <li>
            <Link to="/saved-movies" className="navigation__link">
              Сохраненные фильмы
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navigation__link">
              <div className="navigation__accaunt">
                <p className="navigation__link">Аккаунт</p>
                <button className="navigation__link navigation__button"></button>
              </div>
            </Link>
          </li>
        </Route>

        <Route exact path="/saved-movies">
          <li>
            <Link to="/movies" className="navigation__link">
              Фильмы
            </Link>
          </li>
          <li>
            <Link to="/saved-movies" className="navigation__link">
              Сохраненные фильмы
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navigation__link">
              <div className="navigation__accaunt">
                <p className="navigation__link">Аккаунт</p>
                <button className="navigation__link navigation__button"></button>
              </div>
            </Link>
          </li>
        </Route>

        <Route exact path="/profile">
          <li>
            <Link to="/movies" className="navigation__link">
              Фильмы
            </Link>
          </li>
          <li>
            <Link to="/saved-movies" className="navigation__link">
              Сохраненные фильмы
            </Link>
          </li>
          <li>
            <Link to="/profile" className="navigation__link">
              <div className="navigation__accaunt">
                <p className="navigation__link">Аккаунт</p>
                <button className="navigation__link navigation__button"></button>
              </div>
            </Link>
          </li>
        </Route>
      </Switch>
    </ul>
  );
}

export default Navigation;
