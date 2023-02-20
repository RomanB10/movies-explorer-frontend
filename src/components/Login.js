import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="loginContainer">
      <div className={`form__container`}>
        <form
          className={`form__auth`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
        >
          <h3 className={`form__heading`}>Рады видеть!</h3>

          <fieldset className={`form__items`}>
            <div className="form__item-conteiner">
              <label for="email" className="form__label">
                E-mail
              </label>
              <input
                className="form__input"
                type="text"
                name="email"
                id="email"
                placeholder="pochta@yandex.ru"
                required
                minLength="2"
                maxLength="40"
                tabIndex="2"
              />
            </div>
            <div className="form__item-conteiner">
              <label for="password" className="form__label">
                Пароль
              </label>
              <input
                className="form__input"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                tabIndex="3"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            name="submit"
            className={`popup__submit-btn`}
            tabIndex="3"
          >
            Войти
          </button>

          <p className="popup__question">
            Ещё не зарегистрированы?
            <Link
              className="popup__question popup__question-enter"
              to="/signin"
            >
              {" "}
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
