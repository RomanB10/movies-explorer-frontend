import './Header.css';
import headerLogo from '../images/logo.svg';
import Navigation from './Navigation';

function Header() {
    return (
    <header className = 'header conteiner-padding'>
        <img className ='header__logo' src = {headerLogo} alt = 'Здесь должно быть изображение Лого'/>
        <Navigation></Navigation>
    </header>
    );
}

export default Header;