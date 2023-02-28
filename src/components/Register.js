import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="registerContainer">
      <div className={`form__container`}>
        <form
          className={`form__auth`}
          action="./scripts/script.js"
          method="post"
          name={`_type_auth`}
          tabIndex="0"
        >
          <h3 className={`form__heading`}>
            Добро пожаловать!
          </h3>

          <fieldset
            className={`form__items form__items_type_register`}
          >
            <div className="form__item-conteiner">
              <label for='name' className="form__label">Имя</label>
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                placeholder="Виталий"
                required
                minLength="2"
                maxLength="40"
                tabIndex="1"
                title="Введите Имя"
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </div>
            <div className="form__item-conteiner">
              <label for='email' className="form__label">E-mail</label>  
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
                title="Введите почту"
              />
              <span className="form__input-error">Что-то пошло не так...</span>
            </div>
            <div className="form__item-conteiner">
              <label for='password' className="form__label">Пароль</label>  
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
                title="Введите пароль"
              />
              <span className="form__input-error" >Что-то пошло не так...</span>
            </div>
          </fieldset>

          <button
            type="submit"
            name="submit"
            className={`form__submit-btn`}
            tabIndex="3"
          >
            Зарегистрироваться
          </button>

          <p className="form__suggestion">
            Уже зарегистрированы?
            <Link className="form__suggestion form__suggestion-enter" to="/signin">
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
