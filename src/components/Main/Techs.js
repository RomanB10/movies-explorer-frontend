import './Techs.css';

function Techs(){
    return(
        <section className='techs' id ="techs">
            <h2 className='text-subtitle'>Технологии</h2>
            <div className='container'>
                <h2 className='container__title'>7 технологий</h2>
                <p className='container__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
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