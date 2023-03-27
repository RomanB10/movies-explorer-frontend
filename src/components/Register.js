import "./Register.css";
import { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import useFormWithValidation from "../utils/useFormWithValidation";//Валидация по диплому 

function Register({ onRegister, isLoggedIn, isloading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const errorName =
    errors.name === ""
      ? `form__input-error`
      : `form__input-error form__input-error_visible`;
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
    onRegister(values.name, values.email, values.password);
  }

  //ОЧИСТКА ФОРМЫ
  useEffect(() => {
    resetForm({}, {}, false);
  }, [resetForm]);
console.log('isLoggedIn=',isLoggedIn)

  //если пользователь авторизован, рендерить маршрут '/movies'
  if (isLoggedIn) {
    return <Redirect to="/movies" />;
  }

  return (
    <div className="registerContainer">
      <div className={`form__container`}>
        <form
          className={`form__auth`}
          method="post"
          name={`_type_auth`}
          tabIndex="0"
          onSubmit={handleSubmit}
          noValidate
        >
          <h3 className={`form__heading`}>Добро пожаловать!</h3>

          <fieldset className={`form__items form__items_type_register`}>
            <div className="form__item-conteiner">
              <label for="name" className="form__label">
                Имя
              </label>
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                placeholder="Виталий"
                required
                minLength="2"
                maxLength="200"
                tabIndex="1"
                title="Введите Имя"
                disabled= {isloading}
                value={values.name || ""} //добавили значение по умолчанию, чтобы в value не попадало undefined
                onChange={handleChange}
              />
              <span className={errorName}>{errors.name}</span>
            </div>
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
                tabIndex="2"
                title="Введите почту"
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
                tabIndex="3"
                title="Введите пароль"
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
            Зарегистрироваться
          </button>

          <p className="form__suggestion">
            Уже зарегистрированы?
            <Link
              className="form__suggestion form__suggestion-enter"
              to="/signin"
            >
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

/*
 //переменная состояния полей формы Регистрации
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  // функция записи значений полей формы
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(event){
    //запрещаем браузеру переходить по адресу формы, атрибут action не указан
    event.preventDefault();
    if (!formValue.name || !formValue.email || !formValue.password) {
      return;
    }
    //вызов колбэка Регистрации с передачей полей ввода 
    onRegister(formValue.name, formValue.email, formValue.password)
  }

  */
