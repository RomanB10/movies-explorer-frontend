import { useEffect,useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext"; // Подписали компонент на контекст
import { Link } from "react-router-dom";
import useFormWithValidation from "../utils/useFormWithValidation";//Валидация по диплому 
/*import "./Profile.css";*/
import './Login.css';

function Profile({ onLogout, onUpdateUser }) {
  //Хук возвращает значение контекста, которое было передано в прорс value провайдера
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    isValid,
    setIsValid,
  } = useFormWithValidation();

  const errorName =
    errors.email === ""
      ? `form__input-error`
      : `form__input-error form__input-error_visible`;
  const errorEmail =
    errors.password === ""
      ? `form__input-error`
      : `form__input-error form__input-error_visible`;

  function handleChangeName(event) {
    //условие для совпадения имени при вводе в поле
    if (event.target.value === currentUser.name) {
      setIsValid(false);
      setErrors({
        errors: errors.name,
        [event.target.name]: "Введите другое имя отличное от установленного",
      });
    } else {
      //общий случай
      handleChange(event);
    }
  }

  function handleChangeEmail(event) {
    //условие для совпадения email при вводе в поле
    if (event.target.value === currentUser.email) {
      setIsValid(false);
      setErrors({
        errors: errors.name,
        [event.target.name]: "Введите другой Email отличный от установленного",
      });
      console.log(errors);
    } else {
      //общий случай
      handleChange(event);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    //передаем значения во внешний обработчик для передачи в apiMain.setUserInfo(data)
    onUpdateUser({ name: values.name, email: values.email });
  }

  useEffect(() => {
    setIsValid(false);
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [onUpdateUser]);

  return (
    <div className="profileContainer">
      <div className={`form__container form__container_type_profile`}>
        <form
          className={`form__auth`}
          method="post"
          name={`_type_profile`}
          tabIndex="0"
          onSubmit={handleSubmit}
        >
          <h3 className={`form__heading form__heading_type_profile`}>
            Привет, {currentUser.name}
          </h3>

          <fieldset className={`form__items form__items_type_profile`}>
            <div className="form__item-conteiner">
              <label
                for="name"
                className="form__label form__label_type_profile"
              >
                Имя
              </label>
              <input
                className="form__input form__input_type_profile form__input_type_profile-underline"
                type="text"
                name="name"
                id="name"
                placeholder="Виталий"
                required
                minLength="2"
                maxLength="200"
                tabIndex="2"
                value={values.name || ""} //добавили значение по умолчанию, чтобы в value не попадало undefined
                onChange={handleChangeName}
              />
              <span className={errorName}>{errors.name}</span>
            </div>
            <div className="form__item-conteiner">
              <label
                for="email"
                className="form__label form__label_type_profile"
              >
                E-mail
              </label>
              <input
                className="form__input form__input_type_profile"
                type="email"
                name="email"
                id="email"
                placeholder="pochta@yandex.ru"
                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
                minLength="2"
                maxLength="200"
                tabIndex="3"
                value={values.email || ""} //добавили значение по умолчанию, чтобы в value не попадало undefined
                onChange={handleChangeEmail}
              />
              <span className={errorEmail}>{errors.email}</span>
            </div>
          </fieldset>

          <button
            type="submit"
            name="edit"
            tabIndex="3"
            disabled={!isValid}
            className={
              isValid
                ? `form__suggestion form__suggestion_type_edit`
                : `form__suggestion form__suggestion_type_edit form__suggestion_type_inactive`
            }
          >
            Редактировать
          </button>
          <Link
            className="form__suggestion form__suggestion_type_signout"
            to="/signin"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Profile;