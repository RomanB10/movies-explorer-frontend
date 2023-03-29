import "./MenuPopup.css";
import {useEffect} from 'react';
import Navigation from "./Navigation";

function MenuPopup ({ isMenuPopupOpen, onClose, currentPath, loggedIn, width }) {

function handleEscClose(evt){
  if (evt.key === "Escape"){
    onClose && onClose()
  }
};

useEffect(()=>{
  window.addEventListener('keydown',handleEscClose);
  return()=>{
    window.removeEventListener('keydown', handleEscClose)
  };
}, [])

  return (
    <div className={isMenuPopupOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container">
        <Navigation
          currentPath={currentPath}
          loggedIn={loggedIn}
          width={width}
          onClose={onClose}
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
