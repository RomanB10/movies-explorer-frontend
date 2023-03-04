import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="conteiner-point">
      <h2 className="conteiner-point__title">О проекте</h2>
      <div className="plan " id="project">
        <div className="plan__item-conteiner">
          <p className="plan__text-main">Дипломный проект включал 5 этапов</p>
          <p className="plan__text-secondary">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="plan__item-conteiner">
          <p className="plan__text-main">На выполнение диплома ушло 5 недель</p>
          <p className="plan__text-secondary">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="figure">
        <p className="figure__weeks figure__weeks-active">1 неделя</p>
        <p className="figure__weeks">4 недели</p>
        <p className="figure__program">Back-end</p>
        <p className="figure__program">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
