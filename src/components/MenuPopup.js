import "./MenuPopup.css";
import Navigation from "./Navigation";

function MenuPopup({ isMenuPopupOpen, onClose, currentPath, loggedIn, width }) {
  return (
    <div className={isMenuPopupOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <Navigation
          currentPath={currentPath}
          loggedIn={loggedIn}
          width={width}
        />
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default MenuPopup;
