import "./AboutMe.css";
import Portfolio from "./Portfolio";

function AboutMe() {
  return (
    <section className="conteiner-point conteiner-point_type_student" >
      <h2 className="conteiner-point__title">Студент</h2>
      <div className="student" id="student">
        <div className="student__container">
          <h2 className="student__title">Роман</h2>
          <p className="student__subtitle">Фронтенд-разработчик, 31 год</p>
          <p className="student__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="student__link" href="https://github.com/RomanB10?tab=repositories" target='_blank' rel="noopener noreferrer">Github</a>
        </div>
        <div className="student__ava"></div>
      </div>
      <Portfolio></Portfolio>
    </section>
  );
}

export default AboutMe;
