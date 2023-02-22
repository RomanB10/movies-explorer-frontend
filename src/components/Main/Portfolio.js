import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__items">
        <a className="portfolio__item portfolio__item-border" href="https://romanb10.github.io/how-to-learn/" target='_blank'>
          <p className="portfolio__text">Статичный сайт</p>
          <button className="portfolio__btn"></button>
        </a>
        <a className="portfolio__item portfolio__item-border" href="https://romanb10.github.io/russian-travel/" target='_blank'>
          <p className="portfolio__text">Адаптивный сайт</p>
          <button className="portfolio__btn"></button>
        </a>
        <a className="portfolio__item" href="https://github.com/RomanB10/react-mesto-api-full" target='_blank'>
          <p className="portfolio__text">Одностраничное приложение</p>
          <button className="portfolio__btn"></button>
        </a>
      </ul>
    </section>
  );
}

export default Portfolio;
