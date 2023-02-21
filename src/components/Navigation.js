import "./Navigation.css";
import { Link, Route, Routes } from "react-router-dom";

function Navigation() {
  return (
    <ul className="navigation">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <li>
                <Link to="/signup" className="navigation__link navigation__link_text_small-size">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to="/signin" className="navigation__link navigation__link_text_small-size navigation__link_type_enter">
                  Войти
                </Link>
              </li>
            </>
          }
        ></Route>

        <Route
          exact
          path="/movies"
          element={
            <>
              <li>
                <Link to="/movies" className="navigation__link">
                  Фильмы
                </Link>
              </li>
              <li>
                <Link to="/signin" className="navigation__link">
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
            </>
          }
        ></Route>
      </Routes>
    </ul>
  );
}

export default Navigation;
