import './AboutProject.css';

function AboutProject(){
    return (
        <section className='project' id ="project">
            <h2 className='text-subtitle'>О проекте</h2>
            <div className='two-columns'>
                <p className='two-columns__title'>Дипломный проект включал 5 этапов</p>
                <p className='two-columns__title'>На выполнение диплома ушло 5 недель</p>
                <p className='two-columns__subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className='two-columns__subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className='plan'>
                <p className='plan__weeks plan__weeks-active'>1 неделя</p>
                <p className='plan__weeks'>4 недели</p>
                <p className='plan__program'>Back-end</p>
                <p className='plan__program'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;