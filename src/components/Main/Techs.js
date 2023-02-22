import './Techs.css';

function Techs(){
    return(
        <section className='conteiner-point conteiner-padding'>
            <h2 className='conteiner-point__title'>Технологии</h2>
            <div className='techs ' id ="techs">
                <h2 className='techs__title'>7 технологий</h2>
                <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='stack'>
                    <li className='stack__cell'>
                        <p className='stack__text'>HTML</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>CSS</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>JS</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>React</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>Git</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>Express.js</p>
                    </li>
                    <li className='stack__cell'>
                        <p className='stack__text'>mongoDB</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;