import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import useFormWithValidation from "../utils/useFormWithValidation";//Валидация по диплому 

function Login({ handleLogin, isLoggedIn, isloading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const errorEmail =
    errors.email === ""
      ? `form__input-error`
      : `form__input-error form__input-error_visible`;
  const errorPassword =
    errors.password === ""
      ? `form__input-error`
      : `form__input-error form__input-error_visible`;

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
  }

  //ОЧИСТКА ФОРМЫ
  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);

  //если пользователь авторизован, рендерить маршрут '/movies'
  if (isLoggedIn) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="loginContainer">
      <div className={`form__container`}>
        <form
          className={`form__auth`}
          method="post"
          name={`_type_auth`}
          tabIndex="0"
          onSubmit={handleSubmit}
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
                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                minLength="2"
                maxLength="200"
                tabIndex="1"
                disabled= {isloading}
                value={values.email || ""} //добавили значение по умолчанию, чтобы в value не попадало undefined
                onChange={handleChange}
              />
              <span className={errorEmail}>{errors.email}</span>
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
                minLength="8"
                maxLength="200"
                tabIndex="2"
                disabled= {isloading}
                value={values.password || ""} //добавили значение по умолчанию, чтобы в value не попадало undefined
                onChange={handleChange}
              />
              <span className={errorPassword}>{errors.password}</span>
            </div>
          </fieldset>

          <button
            className={
              isValid
                ? `form__submit-btn`
                : `form__submit-btn form__submit-btn_inactive`
            }
            type="submit"
            name="submit"
            tabIndex="3"
            disabled={isValid && isloading? 'true': !isValid && isloading? 'true':!isValid && !isloading?'false':""}
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

