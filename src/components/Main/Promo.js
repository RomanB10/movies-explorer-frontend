import "./Promo.css";
import promoLogo from '../../images/promoLogo.svg'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__image" src={promoLogo} alt="Здесь должен быть логотип"/>
    </section>
  );
}

export default Promo;
