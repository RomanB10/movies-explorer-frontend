import "./Login.css";
import { Link } from "react-router-dom";
import {useState} from 'react'

function Login() {

/*const [password, setPassword] = useState('');

function handleChangePassword(event){
  event.preventDefault();
  setPassword(event.target.value)
}*/
  return (
    <div className="loginContainer">
      <div className={`form__container`}>
        <form
          className={`form__auth`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
         /* onSubmit={handleChangePassword}*/
        >
          <h3 className={`form__heading`}>Рады видеть!</h3>

          <fieldset className={`form__items form__items_type_login`}>
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
            className={`form__submit-btn`}
            tabIndex="3"
          >
            Войти
          </button>

          <p className="form__suggestion">
            Ещё не зарегистрированы?
            <Link
              className="form__suggestion form__suggestion-enter"
              to="/signup"
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
