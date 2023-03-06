import "./Header.css";
import headerLogo from "../images/logo.svg";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import {SCREEN_SM, SCREEN_MD, SCREEN_LG} from '../components/const-breakpoints';
import {useEffect,useState} from 'react';

function Header({ currentPath, onMenuClick }) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
console.log('width',width)
  return (
    <header
      className={
        currentPath === "/"
          ? `header`
          : currentPath === "/movies"
          ? `header header_type_dark`
          : currentPath === "/saved-movies"
          ? `header header_type_dark`
          : currentPath === "/profile"
          ? `header header_type_dark header_type_profile`
          : currentPath === "/signin"
          ? `header header_type_dark header_type_auth`
          : currentPath === "/signup"
          ? `header header_type_dark header_type_auth`
          : ""
      } 
    >
      <Link to="/">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Здесь должно быть изображение Лого"
        />
      </Link>
      {currentPath === "/" ? (
        <Navigation currentPath ={currentPath} width={width}/>
      ) : currentPath === "/movies" ? (
        <>
        { width > SCREEN_MD?
          <Navigation currentPath ={currentPath} width={width}/>:
          <button className="button-open-menu" onClick={onMenuClick}/>
        }
        </>
      ) : currentPath === "/saved-movies" ? (
        <>
        { width > SCREEN_MD?
          <Navigation currentPath ={currentPath} width={width}/>:
          <button className="button-open-menu" onClick={onMenuClick}/>
        }
        </>
      ) : currentPath === "/profile" ? (
        <>
        { width > SCREEN_MD?
          <Navigation currentPath ={currentPath}/>:
          <button className="button-open-menu" onClick={onMenuClick}/>
        }
        </>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
