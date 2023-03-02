import "./Navigation.css";
import { Link, Route, Switch } from "react-router-dom";
import {SCREEN_SM, SCREEN_MD, SCREEN_LG} from '../components/const-breakpoints';

function Navigation({currentPath,width}) {
  console.log('currentPath in navigation',currentPath)
  return (
  <div className={width < SCREEN_MD || currentPath==='/'? `navigation navigation-lead`:`navigation navigation-second`} >
    <ul className={width < SCREEN_MD || currentPath==='/'? `navigation__list navigation__list-lead`:`navigation__list navigation__list-second`}>
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
            <Link
              to="/"
              className="navigation__link  navigation__link_disabled"
            >
              Главная
            </Link>
          </li>
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
        </Route>

        <Route exact path="/saved-movies">
          <li>
            <Link
              to="/"
              className="navigation__link navigation__link_disabled"
            >
              Главная
            </Link>
          </li>
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
        </Route>

        <Route exact path="/profile">
          <li>
            <Link
              to="/"
              className="navigation__link  navigation__link_disabled"
            >
              Главная
            </Link>
          </li>
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
        </Route>
      </Switch>
    </ul>
    {currentPath === "/movies" ? (
      <Link to="/profile" className="navigation__link">
      <div className="navigation__accaunt">
        <p className="navigation__link">Аккаунт</p>
        <button className="navigation__button"></button>
      </div>
    </Link>
    ) : currentPath === "/saved-movies" ? (
      <Link to="/profile" className="navigation__link">
              <div className="navigation__accaunt">
                <p className="navigation__link">Аккаунт</p>
                <button className="navigation__button"></button>
              </div>
            </Link>
    ) : currentPath === "/profile" ? (
      <Link to="/profile" className="navigation__link">
              <div className="navigation__accaunt">
                <p className="navigation__link">Аккаунт</p>
                <button className="navigation__button"></button>
              </div>
            </Link>
    ) : (
      <></>
    )}
    </div>
  );
}

export default Navigation;
