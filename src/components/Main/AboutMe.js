import "./AboutMe.css";
import Portfolio from "./Portfolio";

function AboutMe() {
  return (
    <section className="student" id="student">
      <h2 className="text-subtitle">Студент</h2>
      <div className="student__container">
        <div className="student__container-wrap">
          <h2 className="student__container-wrap__title">Роман</h2>
          <p className="student__container-wrap__subtitle">Фронтенд-разработчик, 31 год</p>
          <p className="student__container-wrap__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <p className="student__container-wrap__link">Github</p>
        </div>
        <div className="container__ava"></div>
      </div>
      <Portfolio></Portfolio>
    </section>
  );
}

export default AboutMe;
