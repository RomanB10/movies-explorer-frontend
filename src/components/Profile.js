import './Profile.css'
import { Link } from 'react-router-dom';

function Profile(){
    return(
        <div className="profileContainer">
        <div className={`form__container form__container_type_profile`}>
          <form
            className={`form__auth`}
            action="./scripts/script.js"
            method="post"
            name={`_type_auth`}
            tabIndex="0"
          >
            <h3 className={`form__heading form__heading_type_profile`}>
            Привет, Виталий!
            </h3>
  
            <fieldset
              className={`form__items form__items_type_profile`}
            >
              <div className="form__item-conteiner">
                <label for="name" className="form__label form__label_type_profile">
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
                  maxLength="40"
                  tabIndex="2"
                />
              </div>
              <div className="form__item-conteiner">
                <label for="email" className="form__label form__label_type_profile">
                  E-mail
                </label>
                <input
                  className="form__input form__input_type_profile"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="pochta@yandex.ru"
                  required
                  minLength="2"
                  maxLength="200"
                  tabIndex="3"
                />
              </div>
            </fieldset>
 
              <Link className="form__suggestion form__suggestion_type_edit" to="/signin">
              Редактировать
              </Link>
              <Link className="form__suggestion form__suggestion_type_signout" to="/signin">
                Выйти из аккаунта
              </Link>
          </form>
        </div>
      </div>
    )
}

export default Profile;