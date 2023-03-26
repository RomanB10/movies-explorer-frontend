import "./Navigation.css";
import { Link, Route, Switch } from "react-router-dom";
import { SCREEN_MD } from "../utils/constants";

function Navigation({ currentPath, width, loggedIn, onClose }) {
  return (
    <div
      className={
        width <= SCREEN_MD && currentPath === "/" && !loggedIn
          ? `navigation navigation-lead`
          : `navigation navigation-dropdown`
      }
    >
      <ul
        className={
          width <= SCREEN_MD && currentPath === "/" && !loggedIn
            ? `navigation__list navigation__list-lead`
            : `navigation__list navigation__list-dropdown`
        }
      >
        <Switch>
          <Route exact path="/">
            {loggedIn ? (
              <>
                <li>
                  <Link
                    onClick={width <= SCREEN_MD && onClose}
                    to="/"
                    className="navigation__link  navigation__link_disabled navigation__link_text_large-size"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={width <= SCREEN_MD && onClose}
                    to="/movies"
                    className="navigation__link navigation__link_text_large-size"
                  >
                    Фильмы
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={width <= SCREEN_MD && onClose}
                    to="/saved-movies"
                    className="navigation__link navigation__link_text_large-size"
                  >
                    Сохраненные фильмы
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={width <= SCREEN_MD && onClose}
                    to="/signup"
                    className="navigation__link navigation__link_text_small-size"
                  >
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={width <= SCREEN_MD && onClose}
                    to="/signin"
                    className="navigation__link navigation__link_text_small-size navigation__link_type_enter"
                  >
                    Войти
                  </Link>
                </li>
              </>
            )}
          </Route>

          <Route exact path="/movies">
            <li>
              <Link
               onClick={width <= SCREEN_MD && onClose}
                to="/"
                className="navigation__link  navigation__link_disabled navigation__link_text_large-size"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/saved-movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
          </Route>

          <Route exact path="/saved-movies">
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/"
                className="navigation__link navigation__link_disabled navigation__link_text_large-size"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/saved-movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
          </Route>

          <Route exact path="/profile">
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/"
                className="navigation__link  navigation__link_disabled navigation__link_text_large-size"
              >
                Главная
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                onClick={width <= SCREEN_MD && onClose}
                to="/saved-movies"
                className="navigation__link navigation__link_text_large-size"
              >
                Сохраненные фильмы
              </Link>
            </li>
          </Route>
        </Switch>
      </ul>
      {(currentPath === "/" && loggedIn) ||
      currentPath === "/movies" ||
      currentPath === "/saved-movies" ||
      currentPath === "/profile" ? (
        <Link onClick={width <= SCREEN_MD && onClose} to="/profile" className="navigation__link">
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
