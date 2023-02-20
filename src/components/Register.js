import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="registerContainer">
      <div className={`popup__container popup__container_type_register`}>
        <form
          className={`popup__form`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
        >
          <h3 className={`popup__title popup__title_type_register`}>
            Добро пожаловать!
          </h3>

          <fieldset
            className={`popup__form-items popup__form-items_type_register`}
          >
            <div className="popup__form-item popup__form-item_type_register">
              <label for='name' className="form__label">Имя</label>
              <input
                className="popup__input popup__input_type_register"
                type="text"
                name="name"
                id="name"
                placeholder="Виталий"
                required
                minLength="2"
                maxLength="40"
                tabIndex="1"
              />
              <span className="name-error popup__input-error" />
            </div>
            <div className="popup__form-item popup__form-item_type_register">
              <label for='email' className="form__label">E-mail</label>  
              <input
                className="popup__input popup__input_type_register"
                type="text"
                name="email"
                id="email"
                placeholder="pochta@yandex.ru"
                required
                minLength="2"
                maxLength="40"
                tabIndex="2"
              />
              <span className="name-error popup__input-error" />
            </div>
            <div className="popup__form-item popup__form-item_type_register">
              <label for='password' className="form__label">Пароль</label>  
              <input
                className="popup__input popup__input_type_register"
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                minLength="2"
                maxLength="200"
                tabIndex="3"
              />
              <span className="job-error popup__input-error" />
            </div>
          </fieldset>

          <button
            type="submit"
            name="submit"
            className={`popup__submit-btn`}
            tabIndex="3"
          >
            Зарегистрироваться
          </button>

          <p className="popup__question">
            Уже зарегистрированы?
            <Link className="popup__question popup__question-enter" to="/signin">
              {" "}
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
