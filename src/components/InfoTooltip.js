import "./InfoTooltip.css";
import unionFail from "../images/unionFail.svg";
import unionSuccess from "../images/unionSuccess.svg";

function InfoTooltip({ isInfoToolTipOpen, tooltipStatus, onClose }) {
  const imageInfo =
    tooltipStatus === "success"
      ? unionSuccess
      : tooltipStatus === "success update"
      ? unionSuccess
      : unionFail;
      
  const textInfo =
    tooltipStatus === "success"
      ? `Вы успешно зарегистрировались!`
      : tooltipStatus === "success update"
      ? `Вы успешно поменяли учетную запись!`
      : `Что-то пошло не так! Попробуйте еще раз.`;

  return (
    <div className={isInfoToolTipOpen ? "tooltip   tooltip_opened" : "tooltip"}>
      <div className={`tooltip__container`}>
        <button
          className="tooltip__close-btn"
          type="button"
          aria-label="Закрыть"
          tabIndex="1"
          onClick={onClose}
        />
        <img
          className={"tooltip__image"}
          src={imageInfo}
          alt="Здесь должно быть информационная картинка"
        />
        <h3 className={`tooltip__title`}>{textInfo}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
