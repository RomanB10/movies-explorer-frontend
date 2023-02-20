import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__items">
        <li className="portfolio__item portfolio__item-border">
          <p className="portfolio__text">Статичный сайт</p>
          <button className="portfolio__btn"></button>
        </li>
        <li className="portfolio__item portfolio__item-border">
          <p className="portfolio__text">Адаптивный сайт</p>
          <button className="portfolio__btn"></button>
        </li>
        <li className="portfolio__item">
          <p className="portfolio__text">Одностраничное приложение</p>
          <button className="portfolio__btn"></button>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
