import './Main.css'
import Promo from './Promo';
import NavTab from './NavTab';
import AboutProject from './AboutProject';
import Techs from './Techs';
import AboutMe from './AboutMe';

function Main(){
    return(
        <div className='main'>
            <Promo></Promo>
            <NavTab></NavTab>
            <AboutProject></AboutProject>
            <Techs></Techs>
            <AboutMe></AboutMe>
        </div>
    )
}

export default Main;